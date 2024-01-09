import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// components
import SvgColor from 'src/components/svg-color';
import { useRecoilValue } from 'recoil';
import { userDeptState } from 'src/utils/atom';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const userDeptInfo = useRecoilValue(userDeptState);
  let url = '';
  if (typeof userDeptInfo === 'object') {
    url = userDeptInfo.link ?? '';
  }

  console.log(url);

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: '',
        items: [
          { title: '대시보드', path: paths.dept.dashboard(url), icon: ICONS.dashboard },
          { title: '조회 및 예약', path: paths.dept.reserve(url), icon: ICONS.calendar },
          {
            title: '승인 대기 현황',
            path: paths.dept.reservelist(url),
            icon: ICONS.banking,
          },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: '',
        items: [
          {
            title: '관리',
            path: paths.dept.management.root(url),
            icon: ICONS.user,
            children: [
              { title: '장소 관리', path: paths.dept.management.root(url) },
              {
                title: '사용자 관리',
                path: paths.dept.management.manageUser(url),
              },
              { title: '기관 관리', path: paths.dept.management.manageSite(url) },
            ],
          },
        ],
      },
    ],
    [url]
  );

  return data;
}

export function useUserNavData() {
  const userDeptInfo = useRecoilValue(userDeptState);
  let url = '';
  if (typeof userDeptInfo === 'object') {
    url = userDeptInfo.link ?? '';
  }

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: '',
        items: [
          { title: '대시보드', path: paths.dept.dashboard(url), icon: ICONS.dashboard },
          { title: '조회 및 예약', path: paths.dept.reserve(url), icon: ICONS.calendar },
        ],
      },
    ],
    [url]
  );

  return data;
}
