import { basic, initSidebar, initTopbar } from "./modules/layouts";
import { imgLazy, imgPopup, initClipboard, toc } from "./modules/plugins";

basic();
initSidebar();
initTopbar();
imgLazy();
imgPopup();
initClipboard();
toc();
