import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faUser, faHouse, faAnglesLeft, faPenClip, faWrench, faPlus, faUpload, faMinus, faEllipsis, faAngleLeft, faAngleRight, faAnglesRight } from "@fortawesome/free-solid-svg-icons";

// menu
library.add(faBars, faUser, faHouse, faAnglesLeft, faPenClip, faWrench)

// configuration
library.add(faPlus)

// dashboard
library.add(faUpload, faMinus, faEllipsis, faAngleLeft, faAngleRight, faAnglesRight)

export default FontAwesomeIcon