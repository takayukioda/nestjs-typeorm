import { config } from "rxjs";

interface Config {
  name: string
  fallback: number | string | string[]
  optional?: boolean
  delimiter?: string
}
interface ConfigProps {
  [key: string]: number | string | string[]
}
class ConfigService {
  private readonly props: ConfigProps
  public readonly missings: {
    required: string[]
    optional: string[]
  }

  constructor(variables: Config[]) {
    this.missings.required = []
    this.missings.optional = []
    const missingConfigs = configs.filter(config => !process.env[config.name])
    configs.forEach(conf =>
      (conf.optional)
        ? this.missings.optional.push(conf.name)
        : this.missings.required.push(conf.name))
  }

  get(key: string): string {
    const prop = this.props[key]
    if (!prop) {
      return null
    }
    if (Array.isArray(prop)) {
      return prop.join(',')
    }
    return prop.toString()
  }

  getAs<T>(key: string): T {
    const prop = this.props[key]
    if (!prop) {
      return null
    }
    return prop as unknown as T
  }
}

const configs: Config[] = [
  {
    name: 'NODE_ENV',
    fallback: 'develop',
  },
  {
    name: 'DATABASE_HOST',
    fallback: 'localhost',
  },
  {
    name: 'DATABASE_PORT',
    fallback: 5432,
  },
  {
    name: 'DATABASE_NAME',
    fallback: 'sample',
  },
  {
    name: 'DATABASE_USERNAME',
    fallback: 'sample',
  },
  {
    name: 'DATABASE_PASSWORD',
    fallback: '1qazXSW@',
  },
  {
    name: 'REDIS_HOST',
    fallback: 'localhost',
  },
  {
    name: 'REDIS_PORT',
    fallback: 6397,
  },
  {
    name: 'WHITELIST_IPLOCATIONS',
    fallback: ['127.0.0.1', '::1'],
  },
  {
    name: 'ADMIN_BEARER_TOKEN',
    fallback: 'strongest-bearer-token-ever',
  },
]

