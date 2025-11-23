"""Main API routes for Sage MCP."""

from fastapi import APIRouter

from .admin import router as admin_router
from .mcp import router as mcp_router
from .oauth import router as oauth_router
from .registry import router as registry_router

# Main API router
router = APIRouter()

# Include sub-routers
router.include_router(admin_router, prefix="/admin", tags=["admin"])
router.include_router(oauth_router, prefix="/oauth", tags=["oauth"])
router.include_router(registry_router, tags=["registry"])  # Registry routes with full path
router.include_router(mcp_router, prefix="", tags=["mcp"])  # MCP routes at root level
