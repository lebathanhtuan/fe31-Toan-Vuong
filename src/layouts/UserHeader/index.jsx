import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, generatePath } from "react-router-dom";

import { Dropdown, Button, Space, Badge, Divider, Search, Input } from "antd";
import { ShoppingCartOutlined, DownOutlined } from "@ant-design/icons";
import { ROUTES } from "../../constants/routes";
import { logoutAction } from "../../redux/actions";
import * as S from "./styles";

function AdminHeader() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartList } = useSelector((state) => state.cart);
  const { categoryList } = useSelector((state) => state.category);

  const navigate = useNavigate();

  return (
    <S.Headerwrapper>
      <S.HeaderContainer>
        <S.HeaderContent>
          <div>Logo</div>
          <Input placeholder="Search..." style={{ width: 250 }} />
          <div>
            <Space size={10} style={{ color: "white" }}>
              <Link to={ROUTES.USER.CART_LIST}>
                <Badge count={cartList.length} size="small">
                  <ShoppingCartOutlined
                    style={{ color: "black", fontSize: 20 }}
                  />
                  <span color="black">Giỏ hàng/ 0₫</span>
                </Badge>
              </Link>
              <Divider
                type="vertical"
                style={{ borderColor: "white", fontSize: 20 }}
              />
              {userInfo.data.id ? (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "dashboard",
                        label: (
                          <Link to={ROUTES.ADMIN.DASHBOARD}>Dashboard</Link>
                        ),
                        style: {
                          display:
                            userInfo.data.role === "admin" ? "block" : "none",
                        },
                      },
                      {
                        key: "logout",
                        label: "Logout",
                        onClick: () => dispatch(logoutAction()),
                      },
                    ],
                  }}
                >
                  <h3 style={{ cursor: "pointer" }}>
                    {userInfo.data.fullName}
                  </h3>
                </Dropdown>
              ) : (
                <Button
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(ROUTES.LOGIN)}
                >
                  Đăng nhập
                </Button>
              )}
            </Space>
          </div>
        </S.HeaderContent>
      </S.HeaderContainer>
      <S.HeaderDropdown>
        <S.HeaderDropdownNav>
          <div>
            <div className="nav-link-item">
              <Dropdown
                disabled
                menu={{
                  items: [
                    {
                      key: "1",
                      label: <Link to={ROUTES.USER.HOME}>TRANG CHỦ</Link>,
                    },
                  ],
                }}
              >
                <Space size={3} style={{ cursor: "pointer" }}>
                  <Link to={ROUTES.USER.HOME}>TRANG CHỦ</Link>
                </Space>
              </Dropdown>
            </div>
            <div className="nav-link-item">
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "about",
                      label: <Link to={ROUTES.USER.ABOUT}>VỀ CHÚNG TÔI</Link>,
                    },
                    {
                      key: "2",
                      label: <Link to={ROUTES.USER.ABOUT}>CHÍNH SÁCH</Link>,
                    },
                    {
                      key: "3",
                      label: <Link to={ROUTES.USER.ABOUT}>LIÊN HỆ</Link>,
                    },
                    {
                      key: "4",
                      label: <Link to={ROUTES.USER.ABOUT}>SẢN PHẨM</Link>,
                    },
                  ],
                }}
              >
                <Space size={3} style={{ cursor: "pointer" }}>
                  VỀ CHÚNG TÔI <DownOutlined style={{ fontSize: "12px" }} />
                </Space>
              </Dropdown>
            </div>
            <div className="nav-link-item">
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "rolex",
                      label: (
                        <Link
                          to={
                            generatePath(ROUTES.USER.PRODUCT_LIST, {
                              id: categoryList.id,
                            }) + `?filter=${categoryList.id}`
                          }
                        >
                          ĐỒNG HỒ ROLEX
                        </Link>
                      ),
                    },
                    {
                      key: "hublot",
                      label: <Link to={ROUTES.USER.ABOUT}>ĐỒNG HỒ HUBLOT</Link>,
                    },
                    {
                      key: "patekphilippe",
                      label: (
                        <Link to={ROUTES.USER.ABOUT}>
                          ỒNG HỒ PATEK PHILIPPE
                        </Link>
                      ),
                    },
                  ],
                }}
              >
                <Space size={3} style={{ cursor: "pointer" }}>
                  <Link to={ROUTES.USER.PRODUCT_LIST}>DANH SÁCH SẢN PHẨM</Link>
                  <DownOutlined style={{ fontSize: "12px" }} />
                </Space>
              </Dropdown>
            </div>
          </div>
        </S.HeaderDropdownNav>
      </S.HeaderDropdown>
    </S.Headerwrapper>
  );
}
export default AdminHeader;
