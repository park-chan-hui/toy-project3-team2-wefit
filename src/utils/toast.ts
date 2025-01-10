import toast from 'react-hot-toast';

const toastSuccess = (message: string) => {
  toast.success(message, {
    duration: 1500,
    style: {
      fontSize: 'var(--font-small)',
    },
  });
};

const toastError = (message: string) => {
  toast.error(message, {
    duration: 1500,
    style: {
      fontSize: 'var(--font-small)',
    },
  });
};

export { toastSuccess, toastError };
