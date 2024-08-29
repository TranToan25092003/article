import { resolversArticle } from "./article.resolver";
import { resolversCategory } from "./category.resolver";
import { resolverUser } from "./user.resolver";

export const resolvers = [resolversArticle, resolversCategory, resolverUser];
