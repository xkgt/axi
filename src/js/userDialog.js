import { createApp, ref, h } from 'vue';
import {vuetify} from "@/js/plugins.js";
import InputDialog from '@/components/InputDialog.vue'; // 引入 InputDialog 组件

const isChangeAvatarVisible = ref(false);
export function getChangeAvatarDialogRef() {
  return isChangeAvatarVisible;
}

export function openChangeAvatarDialog() {
  isChangeAvatarVisible.value = true;
}

// 登录对话框的可见性状态
const isLoginVisible = ref(false);

export function getLoginDialogRef() {
  return isLoginVisible;
}
export function openLoginDialog() {
  isLoginVisible.value = true;
}

// 注册对话框的可见性状态
const isRegisterVisible = ref(false);
export function getRegisterDialogRef() {
  return isRegisterVisible;
}
export function openRegisterDialog() {
  isRegisterVisible.value = true;
}

// 忘记密码对话框的可见性状态
const isForgetPasswordVisible = ref(false);
export function getForgetPasswordDialogRef() {
  return isForgetPasswordVisible;
}
export function openForgetPasswordDialog() {
  isForgetPasswordVisible.value = true;
}

// 关闭所有对话框的通用方法
export function closeAllDialogs() {
  isLoginVisible.value = false;
  isRegisterVisible.value = false;
  isForgetPasswordVisible.value = false;
}

// 提示
export const snackbar = ref(false)
export const snackbarMessage = ref('')
export const snackbarTimeout = ref(2000)
export function showSnackbar(message, timeout = 2000) {
  snackbarTimeout.value = timeout
  snackbarMessage.value = message;
  snackbar.value = true;
}

export const showInputDialog = ({ title, text }) => {
  return new Promise((resolve) => {
    // 打开 InputDialog 并传递参数
    const dialogInstance = document.createElement('div');
    dialogInstance.id = 'input-dialog-container';
    document.body.appendChild(dialogInstance);

    const app = createApp({
      components: { InputDialog },
      setup() {
        const handleClose = (value) => {
          resolve(value); // 返回用户输入的内容
          app.unmount(); // 销毁实例
          document.body.removeChild(dialogInstance);
        };

        const handleCancel = () => {
          resolve(null); // 返回 null 表示取消操作
          app.unmount(); // 销毁实例
          document.body.removeChild(dialogInstance);
        };

        return {
          dialogTitle: title,
          dialogText: text,
          handleClose,
          handleCancel
        };
      },
      render() {
        return h(
          InputDialog,
          {
            title: this.dialogTitle,
            text: this.dialogText,
            'onClose': this.handleClose,
            'onCancel': this.handleCancel
          }
        );
      }
    });
    app.use(vuetify)
    app.mount(dialogInstance);
  });
};

export const showConfirmDialog = ({ title, text, color = "red" }) => {
  return new Promise((resolve) => {
    const dialog = document.createElement("div");
    dialog.className = "confirm-dialog";
    dialog.style.position = "fixed";
    dialog.style.top = "50%";
    dialog.style.left = "50%";
    dialog.style.transform = "translate(-50%, -50%)";
    dialog.style.backgroundColor = "#fff";
    dialog.style.padding = "20px";
    dialog.style.borderRadius = "8px";
    dialog.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    dialog.style.zIndex = "1000";

    const titleElement = document.createElement("h3");
    titleElement.textContent = title;
    titleElement.style.marginBottom = "10px";
    titleElement.style.color = color;

    const textElement = document.createElement("p");
    textElement.textContent = text;
    textElement.style.marginBottom = "20px";

    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "flex-end";

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "取消";
    cancelButton.style.marginRight = "10px";
    cancelButton.onclick = () => {
      document.body.removeChild(dialog);
      resolve(false);
    };

    const confirmButton = document.createElement("button");
    confirmButton.textContent = "确认";
    confirmButton.style.backgroundColor = color;
    confirmButton.style.color = "#fff";
    confirmButton.onclick = () => {
      document.body.removeChild(dialog);
      resolve(true);
    };

    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(confirmButton);

    dialog.appendChild(titleElement);
    dialog.appendChild(textElement);
    dialog.appendChild(buttonContainer);

    document.body.appendChild(dialog);
  });
};