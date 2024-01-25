import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hooks';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { MenuItem } from '@mui/material';

// ----------------------------------------------------------------------

const OPTIONS = [
  { value: '글로벌리더십학부', label: '글로벌리더십학부' },
  { value: '전산전자공학부', label: '전산전자공학부' },
  { value: '국제어문학부', label: '국제어문학부' },
  { value: '경영경제학부 ', label: '경영경제학부' },
  { value: '법학부', label: '법학부' },
  { value: '커뮤니케이션학부', label: '커뮤니케이션학부' },
  { value: '공간환경시스템공학부', label: '공간환경시스템공학부' },
  { value: '기계제어공학부', label: '기계제어공학부' },
  { value: '콘텐츠융합디자인학부', label: '콘텐츠융합디자인학부' },
  { value: '생명과학부', label: '생명과학부' },
  { value: '전산전자공학부', label: '전산전자공학부' },
  { value: '상담심리사회복지학부', label: '상담심리사회복지학부' },
  { value: 'ICT창업학부', label: 'ICT창업학부' },
];

export default function JwtRegisterView() {
  const { register } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('이름을 입력해주세요'),
    s_id: Yup.string().required('학번을 입력해주세요'),
    deptName: Yup.string().required('학부를 입력해주세요'),
    email: Yup.string().required('메일을 입력해주세요').email('메일 형식이 올바르지 않습니다'),
    password: Yup.string().required('비밀번호를 입력해주세요'),
  });

  const defaultValues = {
    name: '',
    s_id: '',
    deptName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register?.(data.name, data.s_id, data.deptName, data.email, data.password);

      router.push(paths.auth.jwt.login);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">HANSPACE 시작하기</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> 계정이 있으신가요? </Typography>

        <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
          로그인하기
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <RHFTextField name="name" label="이름" />

        <RHFTextField name="s_id" label="학번" />

        <RHFSelect name="deptName" label="학부">
          {OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </RHFSelect>

        <RHFTextField name="email" label="메일 주소" />

        <RHFTextField
          name="password"
          label="비밀번호"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          회원가입
        </LoadingButton>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {renderHead}

      {renderForm}
    </>
  );
}
