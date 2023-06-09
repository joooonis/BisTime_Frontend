import { Button } from '@components/common/Button';
import ErrorMessage from '@components/common/ErrorMessage/ErrorMessage';
import Input from '@components/common/Input';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate/Navigate';
import ProgressBar from '@components/common/ProgressBar/ProgressBar';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@features/hooks';
import { setName } from '@features/schedule/scheduleSlice';
import Image from 'next/image';

interface ScheduleForm {
  name: string;
}

export default function Add() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const nameState = useAppSelector((state) => state.schedule.name);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ScheduleForm>({
    defaultValues: {
      name: nameState,
    },
  });

  const onSubmit = (form: ScheduleForm) => {
    const { name } = form;
    dispatch(setName(name));
    if (name)
      router.push({
        pathname: '/event/schedule/add02',
        query: { uuid: router.query.uuid },
      });
  };

  return (
    <Layout>
      <Navigate back />
      <ProgressBar progress="w-1/3" className="mt-3" />
      <div className="w-full flex flex-col mt-9">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="text-18 text-left w-full">내 일정을 등록합니다.</div>
          <div className="text-18 text-left w-full">이름을 입력해주세요.</div>
        </div>
        <p className="w-full mt-1 text-left flex text-primary-green-1 text-12 font-light">
          <span className="mr-0.5 ">
            <Image
              src="/svg/icons/info_circle_green.svg"
              width={14}
              height={14}
              alt="info"
            />
          </span>
          이전에 등록한 이름인 경우 새로운 일정으로 덮어쓰기 됩니다.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 w-full space-y-5 flex flex-col items-center justify-center"
        >
          <div className="w-full">
            <Input
              name="title"
              placeholder="이름을 입력해주세요."
              height="lg"
              register={register('name', {
                required: true,
                maxLength: 50,
                minLength: 1,
              })}
            />
            {errors.name && errors.name.type === 'required' && (
              <ErrorMessage className="mt-2" message="이름을 입력해주세요." />
            )}
            {errors.name && errors.name.type === 'maxLength' && (
              <ErrorMessage
                className="mt-2"
                message="50자 이내로 작성해주세요."
              />
            )}
          </div>
          <Button>다음</Button>
        </form>
      </div>
    </Layout>
  );
}
