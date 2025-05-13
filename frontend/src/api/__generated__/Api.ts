/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface TeamFilterDto {
  /** List of team IDs to filter memberships by specific teams. */
  teamIds?: string[];
  /** Boolean flag to include memberships that are not assigned to any team. */
  noTeam?: boolean;
}

export interface FilterMembershipsGridDto {
  /** Filter memberships by one or more roles (OWNER, MEMBER, VIEWER). */
  roles?: string[];
  /** Filter to include only guest memberships if true. */
  isGuest?: boolean;
  /** Filter memberships based on last login date. */
  lastLoginAfter?: string;
  /** Filter memberships based on team assignment criteria. */
  teams?: TeamFilterDto;
}

export interface MembershipsGridRequestDto {
  /** Search string to filter memberships by name or email containing this value. */
  search?: string;
  /** Filter memberships based on various criteria. */
  filter: FilterMembershipsGridDto;
  /**
   * Field on which the memberships should be sorted.
   * @default "name"
   */
  sortBy?: "name" | "email" | "role" | "lastLogin" | "teams";
  /**
   * Direction of sorting: ascending or descending.
   * @default "asc"
   */
  sortDirection?: "asc" | "desc";
  /**
   * Page number for paginated results, starting from 1.
   * @default 1
   */
  page: number;
  /**
   * Number of memberships to return per page.
   * @default 20
   */
  limit: number;
}

export interface TeamDto {
  /** Unique identifier of the team. */
  id: string;
  /** Name of the team. */
  name: string;
}

export interface MembershipsGridDto {
  /** Unique identifier of the membership. */
  id: string;
  /** Email address of the member. */
  email: string;
  /** Full name of the member. May be null if not set. */
  name?: object;
  /** Role of the member in the organization. */
  role: string;
  /** Indicates if the member is a guest user. */
  isGuest: boolean;
  /** Timestamp of the last login of the member, or null if never logged in. */
  lastLoginAt?: object;
  /** List of teams this member belongs to. */
  teams: TeamDto[];
  /**
   * Timestamp when the membership was created.
   * @format date-time
   */
  createdAt: string;
  /**
   * Timestamp when the membership was last updated.
   * @format date-time
   */
  updatedAt: string;
}

export interface PaginationMetaDto {
  /** Total number of available data. */
  totalCount: number;
  /** Current page number in the pagination. */
  page: number;
  /** Number of returned per page. */
  limit: number;
  /** Total number of pages available. */
  totalPages: number;
}

export interface MembershipGridResponseDto {
  /** List of membership records. */
  data: MembershipsGridDto[];
  /** Pagination metadata for the memberships. */
  meta: PaginationMetaDto;
}

export interface TeamListRequestDto {
  /**
   * Page number for paginated results, starting from 1.
   * @default 1
   */
  page: number;
  /**
   * Number of team to return per page.
   * @default 20
   */
  limit: number;
}

export interface TeamListDto {
  /** Unique identifier of the team. */
  id: string;
  /** Name of the team. */
  name: string;
}

export interface TeamListResponseDto {
  /** List of team records. */
  data: TeamListDto[];
  /** Pagination metadata for the memberships. */
  meta: PaginationMetaDto;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type ? { "Content-Type": type } : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}

/**
 * @title Trial Day API
 * @version 1.0
 * @contact
 *
 * This is the **Trial Day API**. It provides endpoints for managing memberships, teams and invites.
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  memberships = {
    /**
     * No description
     *
     * @tags Memberships
     * @name Grid
     * @request POST:/api/v1/memberships/gird
     */
    grid: (data: MembershipsGridRequestDto, params: RequestParams = {}) =>
      this.request<MembershipGridResponseDto, any>({
        path: `/api/v1/memberships/gird`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  teams = {
    /**
     * No description
     *
     * @tags Teams
     * @name List
     * @request POST:/api/v1/teams/gird
     */
    list: (data: TeamListRequestDto, params: RequestParams = {}) =>
      this.request<TeamListResponseDto, any>({
        path: `/api/v1/teams/gird`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
