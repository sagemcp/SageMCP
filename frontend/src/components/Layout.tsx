import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  Building2,
  Activity,
  Settings,
  HelpCircle,
  Menu,
  X,
  Store,
  Package
} from 'lucide-react'
import { cn } from '@/utils/cn'
import logo from '@/assets/logo.svg'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Activity },
  { name: 'Tenants', href: '/tenants', icon: Building2 },
  { name: 'Marketplace', href: '/marketplace', icon: Store },
  { name: 'Installations', href: '/installations', icon: Package },
  { name: 'MCP Testing', href: '/mcp-test', icon: Settings },
]

interface LayoutProps {
  children?: React.ReactNode
}

export default function Layout({ children }: LayoutProps = {}) {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={cn(
        'fixed inset-0 z-50 lg:hidden',
        sidebarOpen ? 'block' : 'hidden'
      )}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
          <div className="flex h-16 items-center justify-between px-6">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Sage MCP Logo" className="h-8 w-8 rounded-lg" />
              <span className="text-xl font-semibold text-gray-900">Sage MCP</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6 text-gray-400" />
            </button>
          </div>
          <nav className="mt-8" role="navigation">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center px-6 py-3 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white shadow-lg">
          <div className="flex h-16 items-center px-6 border-b border-gray-200">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Sage MCP Logo" className="h-8 w-8 rounded-lg" />
              <span className="text-xl font-semibold text-gray-900">Sage MCP</span>
            </Link>
          </div>
          <nav className="mt-8 flex-1" role="navigation">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center px-6 py-3 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="p-6 border-t border-gray-200">
            <a
              href="https://github.com/mvmcode/SageMCP/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
            >
              <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                <HelpCircle className="h-4 w-4 text-gray-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Support</p>
                <p className="text-xs text-gray-500">Get help & feedback</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6 text-gray-400" />
            </button>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-success-500 rounded-full"></div>
                <span className="text-sm text-gray-600">System Healthy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  )
}