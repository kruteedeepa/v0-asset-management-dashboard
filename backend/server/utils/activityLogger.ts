import { Activity, IActivity } from '../models/Activity';

export async function logActivity(
  type: IActivity['type'],
  title: string,
  description: string,
  createdBy: string,
  assetId?: string,
  employeeId?: string
) {
  try {
    const activity = new Activity({
      type,
      title,
      description,
      assetId,
      employeeId,
      createdBy,
    });
    await activity.save();
    return activity;
  } catch (error) {
    console.error('Error logging activity:', error);
  }
}
