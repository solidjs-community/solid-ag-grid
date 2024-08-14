import { CellCtrl, PopupEditorWrapper } from '@ag-grid-community/core';
import { JSX, onCleanup, useContext } from 'solid-js';
import { Portal } from "solid-js/web";
import { BeansContext } from '../core/beansContext';
import { EditDetails } from './common';

const PopupEditorComp = (props: {
            editDetails: EditDetails, 
            cellCtrl: CellCtrl, 
            eParentCell: HTMLElement,
            children?: JSX.Element
        }) => {

    const { context, popupService, localeService, gridOptionsService } = useContext(BeansContext);

    const {editDetails, cellCtrl, eParentCell} = props;
    const {compDetails} = editDetails;

    const useModelPopup = gridOptionsService.is('stopEditingWhenCellsLoseFocus');
    
    const wrapper = context.createBean(new PopupEditorWrapper(compDetails.params));
    const ePopupGui = wrapper.getGui();

    const positionParams = {
        column: cellCtrl.getColumn(),
        rowNode: cellCtrl.getRowNode(),
        type: 'popupCellEditor',
        eventSource: eParentCell,
        ePopup: ePopupGui,
        position: editDetails!.popupPosition,
        keepWithinBounds: true
    };

    const positionCallback = popupService.positionPopupByComponent.bind(popupService, positionParams);

    const translate = localeService.getLocaleTextFunc();

    const addPopupRes = popupService.addPopup({
        modal: useModelPopup,
        eChild: ePopupGui,
        closeOnEsc: true,
        closedCallback: () => { cellCtrl.onPopupEditorClosed(); },
        anchorToElement: eParentCell,
        positionCallback,
        ariaLabel: translate('ariaLabelCellEditor', 'Cell Editor')
    });

    const hideEditorPopup: (()=>void) | undefined = addPopupRes ? addPopupRes.hideFunc : undefined;

    onCleanup( ()=> {
        if (hideEditorPopup!=null) {
            hideEditorPopup();
        }
        context.destroyBean(wrapper);
    });

    return (
        <Portal mount={ePopupGui}>
            { props.children }
        </Portal>
    );
};

export default PopupEditorComp;