import {User} from "./user.interface"
import {Product} from "./product.interface"


export interface Order {
  
  id: number;
  status: string;
  date: Date;
  user: User;
  products: Product[];
}
