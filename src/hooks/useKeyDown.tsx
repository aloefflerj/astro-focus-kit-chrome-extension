export const useKeyDown = () => ({
  handleOnEnter: (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callbackFn: (...args: any[]) => void
  ) => {
    if (event.key === 'Enter') {
      callbackFn();
    }
  },
  handleOnCtrlEnter: (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callbackFn: (...args: any[]) => void
  ) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      callbackFn();
    }
  },
});
