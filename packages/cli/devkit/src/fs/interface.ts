export default interface IPackageJSON extends Object {
	name: string;
	version?: string;
	description?: string;
	keywords?: string[];
	homepage?: string;
	bugs?: string | IBugs;
	license?: string;
	author?: string | IAuthor;
	contributors?: string[] | IAuthor[];
	files?: string[];
	main?: string;
	bin?: string | IBinMap;
	man?: string | string[];
	directories?: IDirectories;
	repository?: string | IRepository;
	scripts?: IScriptsMap;
	config?: IConfig;
	dependencies?: IDependencyMap;
	devDependencies?: IDependencyMap;
	peerDependencies?: IDependencyMap;
	optionalDependencies?: IDependencyMap;
	bundledDependencies?: string[];
	engines?: IEngines;
	os?: string[];
	cpu?: string[];
	preferGlobal?: boolean;
	private?: boolean;
	publishConfig?: IPublishConfig;
	aioOption?: IAioOption;
	changeLog?: IChangeLog[];
	[propName: string]: any;
}

export interface IChangeLog {
	version: string;
	log: string[];
}

export interface IAioOption {
	type: string;
	update: boolean;
	chName: string;
}

/**
 * An author or contributor
 */
export interface IAuthor {
	name: string;
	email?: string;
	homepage?: string;
}

/**
 * A map of exposed bin commands
 */
export interface IBinMap {
	[commandName: string]: string;
}

/**
 * A bugs link
 */
export interface IBugs {
	email: string;
	url: string;
}

export interface IConfig {
	name?: string;
	config?: Object;
}

/**
 * A map of dependencies
 */
export interface IDependencyMap {
	[dependencyName: string]: string;
}

/**
 * CommonJS package structure
 */
export interface IDirectories {
	lib?: string;
	bin?: string;
	man?: string;
	doc?: string;
	example?: string;
}

export interface IEngines {
	node?: string;
	npm?: string;
}

export interface IPublishConfig {
	registry?: string;
}

/**
 * A project repository
 */
export interface IRepository {
	type: string;
	url: string;
}

export interface IScriptsMap {
	[scriptName: string]: string;
}
