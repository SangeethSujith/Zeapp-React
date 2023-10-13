import { toast } from "react-toastify"
//! https://fkhadra.github.io/react-toastify/introduction
const toasterConfig = {
	position: toast.POSITION.TOP_RIGHT,
	autoClose: 5000,
	hideProgressBar: false,
	newestOnTop: true,
	closeOnClick: true,
	rtlfalse: true,
	pauseOnFocusLoss: false,
	draggable: true,
	pauseOnHover: true,
	icon: true,
	progress: undefined,
}

export const renderToaster = (props) => {
	/**
	 * INFO, SUCCESS, WARNING, ERROR, DEFAULT
	 */
	const { type = undefined, message = "" } = props;
	if (type) {
		// toast[type](message, { toastId: "customId" })
		toast[type](message)
	} else {
		toast(message, { toastId: "customId" })
	}

}

export default toasterConfig