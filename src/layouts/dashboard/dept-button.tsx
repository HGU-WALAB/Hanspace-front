/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: API 연결해야함

// @mui
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// components
import { useSettingsContext } from 'src/components/settings';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { DeptUrlState, selectedIndexState } from 'src/stores/atom';
//
import { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { paths } from 'src/routes/paths';
import { set } from 'nprogress';
import Logo from 'src/components/logo';
import { strlen } from 'stylis';
// ----------------------------------------------------------------------

const OPTIONS = ['HANSPACE', 'CSEE 뉴턴', '오석관', '산학협력관', '에벤에셀', '기관 추가하기'];

const COLORS = ['primary', 'secondary', 'info', 'success'];

const TITLE = 'HANSPACE';

const DeptButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  width: 200px;
  justify-content: space-between;
  font-size: 1rem;
`;

const Rows = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
`;

export default function DeptHeaderButton() {
  const settings = useSettingsContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const setDeptUrl = useSetRecoilState(DeptUrlState);

  const [selectedIndex, setSelectedIndex] = useRecoilState(selectedIndexState);

  const [isOpenList, setOpenList] = useState<null | HTMLElement>(null);

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

  const handleMenuItemClick = useCallback(
    (event: React.MouseEvent<HTMLElement>, index: number) => {
      setSelectedIndex(index);
      setSelectedIndex(index);
      setDeptUrl(OPTIONS[index]);
      // setOpenList(null);
      handleClose();
      if (index === 0) {
        window.location.replace(paths.hanspace.root); // hanspace
      } 
      else if (index === OPTIONS.length - 1){ // add department
        window.location.replace(paths.hanspace.dept);
      }
      else {
        window.location.href = paths.dept.dashboard(OPTIONS[index]);
      }
    },
    [handleClose, setDeptUrl, setSelectedIndex]
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
                <Rows>
                  {/* <Avatar
                    alt="A"
                    color={COLORS[selectedIndex]}
                    style={{ height: '30px', width: '30px', fontSize: '16px' }}
                  >
                    {OPTIONS[selectedIndex].charAt(0)}
                  </Avatar> */}
                  <Logo />
                  {OPTIONS[selectedIndex]}
                </Rows>
                <ArrowDropDownIcon />
              </DeptButton>
            }
          />
        </ListItemButton>
      </List>

      <Menu id="lock-menu" anchorEl={isOpenList} onClose={handleClose} open={Boolean(isOpenList)}>
        {OPTIONS.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            <DeptButton>
              <Rows>
                <Avatar
                  alt="A"
                  color={COLORS[index]}
                  style={{ height: '30px', width: '30px', fontSize: '16px' }}
                >
                  {option.charAt(0)}
                </Avatar>
                {option}
              </Rows>
            </DeptButton>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
