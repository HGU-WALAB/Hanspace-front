import { useCallback, useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
// types
import { EXSpaceItem } from 'src/types/space';
import SpaceItem from 'src/sections/manageSpace/space-item';
import axiosInstance, { endpoints } from 'src/utils/axios';
import SpaceEditDialog from './space-edit-dialog';
// components
//

// ----------------------------------------------------------------------

type Props = {
  spaces: EXSpaceItem[];
  refetchSpaces: any;
};

export default function SpaceList({ spaces, refetchSpaces }: Props) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentSpace, setCurrentSpace] = useState<EXSpaceItem | null>(null);

  const handleEdit = useCallback((space: EXSpaceItem) => {
    setCurrentSpace(space);
    setIsEditDialogOpen(true);
  }, []);

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setCurrentSpace(null);
  };

  const handleDelete = useCallback(
    (space: EXSpaceItem) => {
      console.log('space', space);
      console.info('DELETE', space?.spaceId);
      axiosInstance.delete(`${endpoints.space.delete}/${space.spaceId}`).then(() => {
        refetchSpaces();
      });
    },
    [refetchSpaces]
  );

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {spaces?.map((space) => (
          <SpaceItem
            key={space?.spaceId}
            space={space}
            onView={() => {}}
            onEdit={() => handleEdit(space)}
            onDelete={() => handleDelete(space)}
          />
        ))}
      </Box>

      {spaces?.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )}

      {isEditDialogOpen && (
        <SpaceEditDialog
          open={isEditDialogOpen}
          onClose={handleCloseEditDialog}
          refetchSpaces={refetchSpaces}
          currentSpace={currentSpace}
        />
      )}
    </>
  );
}
