/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: API 연결해야함

// @mui
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// components
import { useSettingsContext } from 'src/components/settings';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { DeptUrlState, selectedIndexState, userDeptListState, userDeptState } from 'src/utils/atom';
//
import { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { paths } from 'src/routes/paths';
import { set } from 'nprogress';
import Logo from 'src/components/logo';
import { strlen } from 'stylis';
import { IDeptInfo } from 'src/types/dept';
import { IoMdKey } from 'react-icons/io';
// ----------------------------------------------------------------------

const DeptButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  width: 200px;
  font-size: 1rem;
`;

const Rows = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 1.1rem;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export default function DeptHeaderButton() {
  const settings = useSettingsContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const deptList = useRecoilValue(userDeptListState);

  const setUserDeptState = useSetRecoilState(userDeptState);

  const setDeptUrl = useSetRecoilState(DeptUrlState);

  const [selectedIndex, setSelectedIndex] = useRecoilState(selectedIndexState);

  const [isOpenList, setOpenList] = useState<null | HTMLElement>(null);

  const [menuOpen, setMenuOpen] = useRecoilState(userDeptState);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    setOpenList(null);
  }, []);

  const handleClickListItem = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setOpenList(event.currentTarget);
  }, []);

  const handleGOMain = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      handleClose();
      setMenuOpen('HANSPACE');
      setSelectedIndex(-1);
      setDeptUrl('HANSPACE');
      window.location.replace(paths.hanspace.root);
    },
    [handleClose, setMenuOpen, setSelectedIndex, setDeptUrl]
  );

  const handleMenuItemClick = useCallback(
    (event: React.MouseEvent<HTMLElement>, option: IDeptInfo) => {
      setSelectedIndex(deptList?.findIndex((dept) => dept.deptId === option.deptId));
      setUserDeptState(option);
      setMenuOpen(option);
      handleClose();
      setDeptUrl(option?.link ?? 'HANSPACE');
      window.location.href = paths.dept.dashboard(option?.link ?? 'HANSPACE');
    },
    [handleClose, setSelectedIndex, setMenuOpen, deptList, setUserDeptState, setDeptUrl]
  );

  const handleGOAddDept = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      handleClose();
      setMenuOpen('HANSPACE');
      setDeptUrl('HANSPACE');
      window.location.replace(paths.hanspace.dept);
      setSelectedIndex(-2);
    },
    [handleClose, setMenuOpen, setSelectedIndex, setDeptUrl]
  );

  return (
    <>
      <List component="nav" aria-label="Device settings">
        <ListItemButton
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          onClick={handleClickListItem}
        >
          <ListItemText
            primary={
              <DeptButton>
                <Container>
                  {menuOpen === 'HANSPACE' ? (
                    <Logo />
                  ) : (
                    <Avatar
                      alt="A"
                      color="primary.pale"
                      style={{ height: '30px', width: '30px', fontSize: '16px' }}
                    >
                      {typeof menuOpen === 'object' && menuOpen.deptName?.charAt(0)}
                    </Avatar>
                  )}
                  {typeof menuOpen === 'string' && menuOpen}
                  {typeof menuOpen === 'object' && menuOpen.deptName}
                </Container>
                <ArrowDropDownIcon />
              </DeptButton>
            }
          />
        </ListItemButton>
      </List>

      <Menu id="lock-menu" anchorEl={isOpenList} onClose={handleClose} open={Boolean(isOpenList)}>
        <MenuItem
          key="HANSPACE"
          selected={selectedIndex === -1}
          onClick={(event) => handleGOMain(event)}
        >
          <DeptButton>
            <Container>
              <Logo />
              HANSPACE
            </Container>
          </DeptButton>
        </MenuItem>

        {deptList?.map((option, index) => (
          <MenuItem
            key={option.deptId}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, option)}
          >
            <DeptButton>
              <Rows>
                <Container>
                  <Avatar
                    alt="A"
                    color={option.deptName?.charAt(0) === 'A' ? 'primary.pale' : 'info.pale'}
                    style={{ height: '30px', width: '30px', fontSize: '16px' }}
                  >
                    {option.deptName?.charAt(0)}
                  </Avatar>
                  {option.deptName}
                </Container>

                {option.deptMemberResponse[0]?.deptRole === 'ADMIN' ? <IoMdKey /> : <div />}
              </Rows>
            </DeptButton>
          </MenuItem>
        ))}
        <MenuItem
          key="기관 추가하기"
          selected={selectedIndex === -2}
          onClick={(event) => handleGOAddDept(event)}
        >
          <DeptButton>
            <Rows>
              <Avatar
                alt="+"
                color="primary.pale"
                style={{ height: '30px', width: '30px', fontSize: '16px' }}
              >
                + {/* TODO : 아바타 이후에 수정하기  */}
              </Avatar>
              새 기관 추가하기
            </Rows>
          </DeptButton>
        </MenuItem>
      </Menu>
    </>
  );
}
