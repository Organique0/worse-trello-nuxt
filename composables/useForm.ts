export const useForm = () => {
  const useLoginModal = () => useState('login_modal', () => false);
  const useRegisterModal = () => useState('register_modal', () => false);

  const closeAuthModal = () => {
    const loginModal = useLoginModal();
    loginModal.value = false;
    const registerModal = useRegisterModal();
    registerModal.value = false;
  };

  const openAuthModal = (type: string) => {
    if (type == "login") {
      const loginModal = useLoginModal();
      loginModal.value = true;
    } else if (type == "register") {
      const registerModal = useRegisterModal();
      registerModal.value = true;
    }
  };
  return { closeAuthModal, openAuthModal, useLoginModal, useRegisterModal };
}
