import axios from "axios";
import { serverApi } from "../lib/config";
import {
  LoginInput,
  User,
  UserInput,
  UserUpdateInput,
} from "../lib/types/user";
import { UserStatus, UserType } from "../lib/enums/user.enum";

export const USER_STORAGE = "userData";
const LEGACY_MEMBER_STORAGE = "memberData";

export function migrateLegacyMemberToUser(): void {
  const legacy = localStorage.getItem(LEGACY_MEMBER_STORAGE);
  if (!legacy || localStorage.getItem(USER_STORAGE)) return;
  try {
    const m = JSON.parse(legacy) as Record<string, unknown>;
    const u: User = {
      _id: String(m._id ?? ""),
      userType:
        (m.memberType as string) === "ADMIN" ? UserType.ADMIN : UserType.USER,
      userStatus:
        (m.memberStatus as User["userStatus"]) ?? UserStatus.ACTIVE,
      userNick: String(m.memberNick ?? ""),
      userPhone: String(m.memberPhone ?? ""),
      userAddress: m.memberAddress as string | undefined,
      userDesc: m.memberDesc as string | undefined,
      userImage: m.memberImage as string | undefined,
      userPoints: Number(m.memberPoints ?? 0),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    localStorage.setItem(USER_STORAGE, JSON.stringify(u));
  } catch {
    // ignore malformed legacy payload
  }
  localStorage.removeItem(LEGACY_MEMBER_STORAGE);
}

class UserService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getTopUsers(limit: number = 4): Promise<User[]> {
    try {
      const url = `${this.path}/user/top-users?limit=${limit}`;
      const result = await axios.get(url);
      return result.data;
    } catch (err) {
      console.log("Error, getTopUsers:", err);
      return [];
    }
  }

  public async getStoreContact(): Promise<User | null> {
    try {
      const url = `${this.path}/user/store`;
      const result = await axios.get(url);
      return result.data;
    } catch (err) {
      console.log("Error, getStoreContact:", err);
      return null;
    }
  }

  // backward compatibility for old components
  public async getRestaurant(): Promise<User | null> {
    return this.getStoreContact();
  }

  public async signup(input: UserInput): Promise<User> {
    try {
      const url = `${this.path}/signup`;
      const result = await axios.post(url, input, { withCredentials: true });
      const user: User = result.data.user;
      localStorage.setItem(USER_STORAGE, JSON.stringify(user));
      return user;
    } catch (err) {
      console.log("Error, signup", err);
      throw err;
    }
  }

  public async login(input: LoginInput): Promise<User> {
    try {
      const url = `${this.path}/login`;
      const result = await axios.post(url, input, { withCredentials: true });
      const user: User = result.data.user;
      localStorage.setItem(USER_STORAGE, JSON.stringify(user));
      return user;
    } catch (err) {
      console.log("Error, Login", err);
      throw err;
    }
  }

  public async logout(): Promise<void> {
    localStorage.removeItem(USER_STORAGE);
  }

  public async updateUser(input: UserUpdateInput): Promise<User> {
    try {
      const formData = new FormData();
      if (input._id) formData.append("_id", input._id);
      formData.append("userNick", input.userNick || "");
      formData.append("userPhone", input.userPhone || "");
      formData.append("userAddress", input.userAddress || "");
      formData.append("userDesc", input.userDesc || "");
      if (input.userImage instanceof File) {
        formData.append("userImage", input.userImage);
      } else if (typeof input.userImage === "string") {
        formData.append("userImage", input.userImage);
      }

      const result = await axios(`${serverApi}/user/update`, {
        method: "POST",
        data: formData,
        withCredentials: true,
      });

      const user: User = result.data;
      localStorage.setItem(USER_STORAGE, JSON.stringify(user));
      return user;
    } catch (err) {
      console.log("Error, updateUser", err);
      throw err;
    }
  }

  // backward compatibility for old components
  public async updateMember(input: UserUpdateInput): Promise<User> {
    return this.updateUser(input);
  }
}

export default UserService;
