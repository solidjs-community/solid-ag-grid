import {
  ColumnPinnedType,
  HeaderRowContainerCtrl,
  HeaderRowCtrl,
  IHeaderRowContainerComp,
} from "ag-grid-community";
import {
  createEffect,
  createMemo,
  createSignal,
  For,
  onCleanup,
  onMount,
  useContext,
} from "solid-js";
import { BeansContext } from "../core/beansContext";
import { CssClasses } from "../core/utils";
import HeaderRowComp from "./headerRowComp";

const HeaderRowContainerComp = (props: { pinned: ColumnPinnedType | null }) => {
  const [getCssClasses, setCssClasses] = createSignal<CssClasses>(new CssClasses());
  const [getAriaHidden, setAriaHidden] = createSignal<true | false>(false);
  const [getCenterContainerWidth, setCenterContainerWidth] = createSignal<string>();
  const [getPinnedContainerWidth, setPinnedContainerWidth] = createSignal<string>();
  const [getHeaderRowCtrls, setHeaderRowCtrls] = createSignal<HeaderRowCtrl[]>([]);

  const { context } = useContext(BeansContext);
  let eGui: HTMLDivElement;

  const pinnedLeft = props.pinned === "left";
  const pinnedRight = props.pinned === "right";
  const centre = !pinnedLeft && !pinnedRight;

  const destroyFuncs: (() => void)[] = [];

  onCleanup(() => {
    destroyFuncs.forEach((f) => f());
    destroyFuncs.length = 0;
  });

  onMount(() => {
    const compProxy: IHeaderRowContainerComp = {
      setDisplayed: (displayed) => {
        setCssClasses(getCssClasses().setClass("ag-hidden", !displayed));
        setAriaHidden(!displayed);
      },
      setCtrls: (ctrls) => setHeaderRowCtrls(ctrls),

      // centre only
      setCenterWidth: (width) => setCenterContainerWidth(width),
      setViewportScrollLeft: (left) => (eGui.scrollLeft = left),

      // pinned only
      setPinnedContainerWidth: (width) => setPinnedContainerWidth(width),
    };

    const ctrl = context.createBean(new HeaderRowContainerCtrl(props.pinned));
    ctrl.setComp(compProxy, eGui);

    destroyFuncs.push(() => context.destroyBean(ctrl));
  });

  const getClassName = createMemo(() => getCssClasses().toString());

  const insertRowsJsx = () => (
    <For each={getHeaderRowCtrls()}>{(ctrl) => <HeaderRowComp ctrl={ctrl} />}</For>
  );

  const eCenterContainerStyle = createMemo(() => ({
    width: getCenterContainerWidth(),
  }));

  const ePinnedStyle = createMemo(() => ({
    width: getPinnedContainerWidth(),
    "min-width": getPinnedContainerWidth(),
    "max-width": getPinnedContainerWidth(),
  }));

  return (
    <>
      {pinnedLeft && (
        <div
          ref={eGui!}
          class={"ag-pinned-left-header " + getClassName()}
          aria-hidden={getAriaHidden()}
          role="rowgroup"
          style={ePinnedStyle()}
        >
          {insertRowsJsx()}
        </div>
      )}
      {pinnedRight && (
        <div
          ref={eGui!}
          class={"ag-pinned-right-header " + getClassName()}
          aria-hidden={getAriaHidden()}
          role="rowgroup"
          style={ePinnedStyle()}
        >
          {insertRowsJsx()}
        </div>
      )}
      {centre && (
        <div ref={eGui!} class={"ag-header-viewport " + getClassName()} role="presentation">
          <div class="ag-header-container" role="rowgroup" style={eCenterContainerStyle()}>
            {insertRowsJsx()}
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderRowContainerComp;
