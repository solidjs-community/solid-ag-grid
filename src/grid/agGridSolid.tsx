import {
  ColumnApi,
  ComponentUtil,
  Context,
  CtrlsService,
  GridApi,
  GridCoreCreator,
  GridOptions,
  GridParams,
  Module,
} from "ag-grid-community";
import { createEffect, createSignal, For, onCleanup, onMount, Show } from "solid-js";
import { Portal } from "solid-js/web";
import SolidCompWrapperFactory from "./core/solidCompWrapperFactory";
import { SolidFrameworkOverrides } from "./core/solidFrameworkOverrides";
import GridComp from "./gridComp";
import { memoObj } from "./core/utils";

export interface AgGridSolidRef<TData = any> {
  api: GridApi<TData>;
  /** @deprecated v31 - The `columnApi` has been deprecated and all the methods are now present of the `api`. */
  columnApi: ColumnApi;
}

export interface AgGridSolidProps<TData = any> extends GridOptions<TData> {
  gridOptions?: GridOptions<TData>;
  ref?: AgGridSolidRef<TData> | ((ref: AgGridSolidRef<TData>) => void);
  modules?: Module[];
  class?: string;
}

export interface PortalInfo {
  mount: HTMLElement;
  SolidClass: any;
  props: any;
  ref: (instance: any) => void;
}

export interface PortalManager {
  addPortal(info: PortalInfo): void;
  removePortal(info: PortalInfo): void;
}

const AgGridSolid = function <TData = any>(props: AgGridSolidProps<TData>) {
  let eGui!: HTMLDivElement;
  let api!: GridApi<TData>;

  const [context, setContext] = createSignal<Context>();
  const [getPortals, setPortals] = createSignal<PortalInfo[]>([]);

  const destroyFuncs: (() => void)[] = [];
  onCleanup(() => {
    destroyFuncs.forEach((f) => f());
    destroyFuncs.length = 0;
  });

  onMount(() => {
    const modules = props.modules || [];

    const portalManager: PortalManager = {
      addPortal: (info) => {
        setPortals([...getPortals(), info]);
      },
      removePortal: (info) => {
        setPortals(getPortals().filter((item) => item != info));
      },
    };

    const gridParams: GridParams = {
      providedBeanInstances: {
        frameworkComponentWrapper: new SolidCompWrapperFactory(portalManager),
      },
      modules,
      frameworkOverrides: new SolidFrameworkOverrides(),
    };

    const gridOptions = ComponentUtil.combineAttributesAndGridOptions(props.gridOptions, props);

    const createUiCallback = (context: Context) => {
      setContext(context);
      // because React is Async, we need to wait for the UI to be initialised before exposing the API's
      const ctrlsService = context.getBean(CtrlsService.NAME) as CtrlsService;

      ctrlsService.whenReady(() => {
        const refCallback = props.ref && (props.ref as (ref: AgGridSolidRef<TData>) => void);
        if (refCallback) {
          const gridRef: AgGridSolidRef<TData> = {
            api,
            columnApi: new ColumnApi(api),
          };
          refCallback(gridRef);
        }
        destroyFuncs.push(() => api.destroy());
      });
    };

    const acceptChangesCallback = () => {
      // todo, what goes here?
    };

    const gridCoreCreator = new GridCoreCreator();
    api = gridCoreCreator.create(
      eGui,
      gridOptions,
      createUiCallback,
      acceptChangesCallback,
      gridParams,
    );
  });

  // we check for property changes. to get things started, we take a copy
  // of all the properties at the start, and then compare against this for
  // changes.
  const propsCopy: any = {};
  Object.keys(props).forEach((key) => (propsCopy[key] = (props as any)[key]));

  // we memoize the values of the properties to optimize and prevent unwanted notifications
  const memo = memoObj(props);

  createEffect(() => {
    const props = memo();
    const keys = Object.keys(props);
    const changes: {
      [key: string]: { currentValue: any; previousValue: any };
    } = {};
    let changesExist = false;

    keys.forEach((key) => {
      // this line reads from the prop, which in turn makes
      // this prop a dependency for the effect.
      const currentValue = (props as any)[key];

      const previousValue = propsCopy[key];
      if (previousValue !== currentValue) {
        changes[key] = currentValue;
        propsCopy[key] = currentValue;
        changesExist = true;
      }
    });

    if (changesExist) {
      ComponentUtil.processOnChange(changes, api);
    }
  });

  return (
    <div ref={eGui} style={{ height: "100%" }}>
      <Show when={context()}>
        <GridComp class={props.class} context={context()!} />
      </Show>
      <For each={getPortals()}>
        {(info) => (
          <Portal mount={info.mount}>
            <info.SolidClass {...info.props} ref={info.ref} />
          </Portal>
        )}
      </For>
    </div>
  );
};

export default AgGridSolid;
