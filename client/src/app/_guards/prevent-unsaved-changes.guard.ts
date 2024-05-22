import { CanDeactivateFn } from '@angular/router';
import { MemeberEditComponent } from '../members/memeber-edit/memeber-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemeberEditComponent> = (
  component) => {

  if (component.editForm?.dirty) {
    return confirm("Are you sure you want to continuee? Any unsave changes will be lost")
  }

  return true;
};
