import SortableList from './SortableList'
import SimpleList from './list/SimpleList'
import NodeListCustomProvider from './list/NodeListCustomProvider'
import {ListEntry} from './list/ListEntry'
import ListPaginator from './list/ListPaginator'

import SimpleTree from './SimpleTree'

import LabelWithTip from './LabelWithTip'
import SimpleFigureBadge from './SimpleFigureBadge'
import SearchBox from './SearchBox'

import LegacyUIWrapper from './LegacyUIWrapper'
import ReactEditorOpener from './editor/ReactEditorOpener'
import {PaperEditorLayout, PaperEditorNavEntry, PaperEditorNavHeader} from './editor/PaperEditor'

window.PydioComponents = {
    
    SortableList            : SortableList,
    SimpleList              : SimpleList,
    NodeListCustomProvider  : NodeListCustomProvider,
    ListEntry               : ListEntry,
    ListPaginator           : ListPaginator,

    SimpleTree              : SimpleTree,

    LabelWithTip            : LabelWithTip,
    SimpleFigureBadge       : SimpleFigureBadge,
    SearchBox               : SearchBox,
    LegacyUIWrapper         : LegacyUIWrapper,

    ReactEditorOpener       : ReactEditorOpener,
    PaperEditorLayout       : PaperEditorLayout,
    PaperEditorNavEntry     : PaperEditorNavEntry,
    PaperEditorNavHeader    : PaperEditorNavHeader

};

import ContextMenuNodeProviderMixin from './menu/ContextMenuNodeProviderMixin'
import ButtonMenu from './menu/ButtonMenu'
import ContextMenu from './menu/ContextMenu'
import IconButtonMenu from './menu/IconButtonMenu'
import MFB from './menu/MFB'
import Toolbar from './menu/Toolbar'

window.PydioMenus = {
    ContextMenuNodeProviderMixin: ContextMenuNodeProviderMixin,
    ContextMenu: ContextMenu,
    Toolbar:Toolbar,
    ButtonMenu: ButtonMenu,
    IconButtonMenu: IconButtonMenu,
    MFB: MFB
};