import Vue, { ComponentOptions, PluginFunction, AsyncComponent } from 'vue'

type Component = ComponentOptions<Vue> | typeof Vue | AsyncComponent
type Dictionary<T> = { [key: string]: T }
type ErrorHandler = (err: Error) => void

export type RouterMode = 'hash' | 'history' | 'abstract'
export type RawLocation = string | Location
export type RedirectOption = RawLocation | ((to: Route) => RawLocation)
export type NavigationGuard<V extends Vue = Vue> = (
  to: Route,
  from: Route,
  next: (to?: RawLocation | false | ((vm: V) => any) | void) => void
) => any

export declare class Router {
  constructor(options?: RouterOptions)

  beforeEach(guard: NavigationGuard): Function
  
  afterEach(hook: (to: Route, from: Route) => any): Function
  /**
   * 等同于 uni.navigateTo()
   */
  push(location: RawLocation): Promise<Route>
  /**
   * 等同于 uni.redirectTo()
   */
  replace(location: RawLocation): Promise<Route>
  /**
   * 等同于 uni.reLaunch()
   */
  replaceAll(location: RawLocation): Promise<Route>
  /**
   * 等同于 uni.switchTab()
   */
  pushTab(location: RawLocation): Promise<Route>
  /**
   * 等同于 uni.navigateBack()
   * @param delta 回退步数
   */
  back(delta?: number): void

  static install: PluginFunction<never>
}

type Position = { x: number; y: number }
type PositionResult = Position | { selector: string; offset?: Position } | void

export interface RouterOptions {
  /**
   * 是否编码传输
   */
  encodeURI?: boolean
  routes?: RouteConfig[]
  mode?: RouterMode
  fallback?: boolean
  base?: string
  linkActiveClass?: string
  linkExactActiveClass?: string
  parseQuery?: (query: string) => Object
  stringifyQuery?: (query: Object) => string
  scrollBehavior?: (
    to: Route,
    from: Route,
    savedPosition: Position | void
  ) => PositionResult | Promise<PositionResult> | undefined | null
}

type RoutePropsFunction = (route: Route) => Object

export interface PathToRegexpOptions {
  sensitive?: boolean
  strict?: boolean
  end?: boolean
}

export interface RouteConfig {
  path: string
  name?: string
  component?: Component
  components?: Dictionary<Component>
  redirect?: RedirectOption
  /**
   * 对于h5端你必须在首页加上aliasPath并设置为/
   */
  aliasPath?: string

  alias?: string | string[]
  children?: RouteConfig[]
  meta?: any
  beforeEnter?: NavigationGuard
  props?: boolean | Object | RoutePropsFunction
  caseSensitive?: boolean
  pathToRegexpOptions?: PathToRegexpOptions
  /**
   * 可以自定义路由元信息
   */
  [index: string]: any
}

export interface RouteRecord {
  path: string
  regex: RegExp
  components: Dictionary<Component>
  instances: Dictionary<Vue>
  name?: string
  parent?: RouteRecord
  redirect?: RedirectOption
  matchAs?: string
  meta: any
  beforeEnter?: (
    route: Route,
    redirect: (location: RawLocation) => void,
    next: () => void
  ) => any
  props:
    | boolean
    | Object
    | RoutePropsFunction
    | Dictionary<boolean | Object | RoutePropsFunction>
}

export interface Location {
  name?: string
  path?: string
  hash?: string
  query?: Dictionary<string | (string | null)[] | null | undefined>
  params?: Dictionary<string>
  append?: boolean
  replace?: boolean
}

export interface Route {
  path: string
  name?: string
  hash: string
  query: Dictionary<string | (string | null)[]>
  params: Dictionary<string>
  fullPath: string
  matched: RouteRecord[]
  redirectedFrom?: string
  meta?: any
}

export function RouterMount(Vim: any, el: any): any