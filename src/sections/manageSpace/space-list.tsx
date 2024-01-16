import { useCallback, useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
// routes
import { paths } from 'src/routes/paths';
// types
import { ISpaceItem, EXSpaceItem } from 'src/types/space';
import { useRouter } from 'src/routes/hooks';
import SpaceItem from 'src/sections/manageSpace/space-item';
import SpaceEditDialog from './space-edit-dialog';
// components
//

// ----------------------------------------------------------------------

type Props = {
  spaces: EXSpaceItem[];
};

export default function SpaceList({ spaces }: Props) {
  const router = useRouter();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentSpace, setCurrentSpace] = useState<EXSpaceItem | null>(null);

  // const handleView = useCallback(
  //   (id: string) => {
  //     router.push(paths.dashboard.tour.details(id));
  //   },
  //   [router]
  // );

  // const handleEdit = useCallback((id: string) => {
  //   // router.push(paths.dashboard.space.edit(id));
  //   SpaceEditDialog();
  // }, []);

  const handleEdit = useCallback((space: EXSpaceItem) => {
    setCurrentSpace(space);
    setIsEditDialogOpen(true);
  }, []);

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setCurrentSpace(null);
  };

  const handleDelete = useCallback((id: string) => {
    console.info('DELETE', id);
  }, []);

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
            key={space?.id}
            space={space}
            onView={() => {}}
            onEdit={() => handleEdit(space)}
            onDelete={() => handleDelete(space?.id)}
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
          currentSpace={currentSpace}
        />
      )}
    </>
  );
}
