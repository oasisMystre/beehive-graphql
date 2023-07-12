import { ResolverResolveParams } from "graphql-compose";

import { BaseContext } from "../../types/context";

export type TResolveParams<T> = ResolverResolveParams<T, BaseContext>;
