import { useForm } from 'react-hook-form';
import { IoMdSend } from 'react-icons/io';

import Button from '../common/button/Button';
import { toastSuccess, toastError } from '@/utils/toast';
import { CommentSubmitFormProps } from '@/types/comment';

interface CommentFormData {
  content: string;
}

const CommentSubmitForm = ({
  isSubmitting,
  isReplyMode,
  onSubmit,
  onCancel,
}: CommentSubmitFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CommentFormData>({
    defaultValues: {
      content: '',
    },
    mode: 'onChange',
  });

  const content = watch('content');
  const isSubmitDisabled = !content?.trim() || isSubmitting;

  const handleCancel = () => {
    reset({ content: '' });
    onCancel?.();
  };

  const handleFormSubmit = async (data: CommentFormData) => {
    try {
      await onSubmit(data.content);
      reset({ content: '' });
      toastSuccess(
        isReplyMode ? '대댓글이 추가되었어요!' : '댓글이 추가되었어요!',
      );
    } catch (error) {
      console.error('댓글 작성에 실패했어요!', error);
      toastError('댓글 작성에 실패했어요!');
    }
  };

  return (
    <div className="mt-2">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="mt-6 flex gap-2 border-t pt-4"
      >
        <input
          {...register('content', {
            required: '내용을 입력해주세요!',
            maxLength: {
              value: 500,
              message: '댓글은 최대 500자까지 입력할 수 있어요!',
            },
          })}
          className="w-full rounded-lg border p-2 text-sm focus:border-primary focus:outline-none"
          placeholder={
            isReplyMode ? '대댓글을 입력하세요...' : '댓글을 입력하세요...'
          }
        />

        <div className="flex gap-2">
          {isReplyMode && (
            <Button
              type="button"
              variant="danger"
              size="small"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="break-keep"
            >
              취소
            </Button>
          )}
          <Button
            variant="outline"
            size="small"
            type="submit"
            disabled={isSubmitDisabled || content?.length > 500}
          >
            <IoMdSend size={20} />
          </Button>
        </div>
      </form>
      {errors.content && (
        <span className="mx-2 text-xs text-red-500">
          {errors.content.message}
        </span>
      )}
    </div>
  );
};

export default CommentSubmitForm;
