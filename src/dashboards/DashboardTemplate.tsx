import { useState, useCallback } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import ResponsiveDrawer, {
  drawerWidth,
} from "../shared/layout/ResponsiveDrawer";

const DashboardTemplate = () => {
  // نستخدم State بدلاً من useRef العادي للاحتفاظ بعنصر الـ DOM
  const [containerNode, setContainerNode] = useState<HTMLDivElement | null>(
    null,
  );

  // هذه الدالة يتم استدعاؤها فوراً عندما يتم رسم الـ Box في المتصفح
  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      setContainerNode(node);
    }
  }, []);

  return (
    <>
      <Box ref={containerRef}>
        {/* الآن نمرر الـ node المخزن في الـ state بأمان والـ Drawer سيتعرف عليه فوراً */}
        <ResponsiveDrawer container={containerNode} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: {
              xs: 1,
              sm: 3,
              md: 3,
              lg: 3,
              xl: 3,
            },
            pt: { xs: 7, sm: 7 },
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            marginRight: { sm: `${drawerWidth}px` },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default DashboardTemplate;
