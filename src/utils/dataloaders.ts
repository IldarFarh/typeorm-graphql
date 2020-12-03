import DataLoader from "dataloader";
import { User } from "../entities/User";
import { Tag } from "../entities/Tag";
import { toObjectArray } from "../utils/toObjectId"

export const createUserLoader = () =>
  new DataLoader<string, User>(async (userIds) => {
    const users = await User.find({
      where: {
        _id: { $in: toObjectArray(userIds) },
      }
    });
    const userIdToUser: Record<string, User> = {};
    users.forEach((user) => {
      userIdToUser[user.id.toString()] = user;
    });
    return userIds.map((id) => userIdToUser[id]);
  });

export const createTagLoader = () =>
  new DataLoader<string, Tag>(async (tagIds) => {
    const tags = await Tag.find({
      where: {
        _id: { $in: toObjectArray(tagIds) },
      }
    });
    const tagIdToTag: Record<string, Tag> = {};
    tags.forEach((tag) => {
      tagIdToTag[tag.id.toString()] = tag;
    });
    return tagIds.map((id) => tagIdToTag[id]);
  });