import { Button } from '@components/common/Button';
import ErrorMessage from '@components/common/ErrorMessage';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import ProgressBar from '@components/common/ProgressBar';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '@features/hooks';
import { useEffect } from 'react';
import { TimePicker } from '@components/common/TimePicker';
import { usePostEventMutation } from '@apis/event/eventApi.mutation';

type time = {
  value: string;
};

interface ScheuleForm {
  startTime: time;
  endTime: time;
}

function Create() {
  const {
    setValue,
    handleSubmit,
    setError,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<ScheuleForm>();
  const eventState = useAppSelector((state) => state.event);

  const { mutate, isLoading } = usePostEventMutation();
  const onSubmit = (form: ScheuleForm) => {
    const { startTime, endTime } = form;
    if (startTime.value >= endTime.value) {
      setError('startTime', {
        type: 'manual',
        message: '종료시간은 시작시간보다 늦어야 합니다.',
      });
      return;
    }
    mutate({
      title: eventState.title,
      startTime: startTime.value,
      endTime: endTime.value,
    });
  };
  useEffect(
    () => clearErrors(),
    [clearErrors, watch('startTime'), watch('endTime')],
  );

  return (
    <Layout>
      <Navigate back />
      <ProgressBar progress="w-3/4" className="mt-3" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 w-full space-y-5 flex flex-col items-center justify-center"
      >
        <div className="w-full flex flex-col items-center justify-center">
          <div className="text-18 text-left w-full">
            [시간시간] 부터 [종료시간]
          </div>
          <div className="text-18 text-left w-full">
            까지의 일정을 조사합니다.
          </div>
          {errors.startTime && (
            <ErrorMessage message={errors.startTime.message} />
          )}
        </div>

        <div className="w-full flex items-center justify-between mt-4">
          <TimePicker
            name="startTime"
            label="시작시간"
            dayOrNight={false}
            setValue={setValue}
          />
          <TimePicker
            name="endTime"
            label="종료시간"
            dayOrNight={true}
            setValue={setValue}
          />
        </div>
        <div className="w-full flex items-center justify-center mt-5">
          <Button loading={isLoading}>모임 만들기</Button>
        </div>
      </form>
    </Layout>
  );
}
export default Create;
