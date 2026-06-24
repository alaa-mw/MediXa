//  export default DashboardTemplate;
import { useState, useCallback } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import ResponsiveDrawer, {
  // drawerWidth,
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
    <Box
      ref={containerRef}
      sx={{
        display: "flex", // 👈 التعديل الاحترافي لترتيب الـ Drawer والمحتوى بجانب بعضهما
        width: "100vw",
        height: "100vh",
      }}
    >
      <ResponsiveDrawer container={containerNode} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100%",
          overflowY: "auto",
          p: {
            xs: 1,
            sm: 3,
            md: 3,
            lg: 3,
            xl: 3,
          },
          pt: { xs: 8, sm: 9 }, // زيادة طفيفة لضمان عدم اختفاء المحتوى تحت الـ Navbar العلوي
          // الحفاظ على الحسبة الخاصة بها للموقع العربي

          //  width: { sm: `calc(100vw - ${drawerWidth}px - 32px)` },
          //  marginRight: { sm: `${drawerWidth}px` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardTemplate;
