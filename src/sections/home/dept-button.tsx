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
// ----------------------------------------------------------------------

const OPTIONS = ['CSEE 뉴턴', '오석관', '산학협력관', '에벤에셀'];

const COLORS = ['primary', 'secondary', 'info', 'success'];

const DeptButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  width: 175px;
  justify-content: space-between;
`;

const Rows = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

export default function DeptHeaderButton() {
  const settings = useSettingsContext();

  const setDeptUrl = useSetRecoilState(DeptUrlState);

  const [selectedIndex, setSelectedIndex] = useRecoilState(selectedIndexState);

  const [isOpen, setOpen] = useState<null | HTMLElement>(null);

  const [isOpenList, setOpenList] = useState<null | HTMLElement>(null);

  const handleClickListItem = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setOpenList(event.currentTarget);
  }, []);

  const handleMenuItemClick = useCallback(
    (event: React.MouseEvent<HTMLElement>, index: number) => {
      console.log('index', index);
      setSelectedIndex(index);
      setDeptUrl(OPTIONS[index]);
      setOpenList(null);
      window.location.href = paths.dept.dashboard(OPTIONS[index]);
    },
    [setDeptUrl, setSelectedIndex]
  );

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);
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
                  <Avatar
                    alt="A"
                    color={COLORS[selectedIndex]}
                    style={{ height: '30px', width: '30px', fontSize: '16px' }}
                  >
                    {OPTIONS[selectedIndex].charAt(0)}
                  </Avatar>
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
