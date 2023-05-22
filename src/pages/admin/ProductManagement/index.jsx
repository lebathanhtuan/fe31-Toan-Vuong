import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Button,
  Input,
  Select,
  Table,
  Space,
  Avatar,
  Pagination,
} from "antd";

import { ROUTES } from "constants/routes";
import { ADMIN_TABLE_LIMIT } from "constants/paging";
import { getProductListAction, getCategoryListAction } from "redux/actions";
import * as S from "./styles";

function ProductManagement() {
  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    searchKey: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      getProductListAction({
        ...filterParams,
        page: 1,
        limit: ADMIN_TABLE_LIMIT,
      })
    );
    dispatch(getCategoryListAction());
  }, []);

  const { productList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);

  const tableColumn = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (_, item) => {
        return (
          <Space>
            <Avatar src={item.images[0]?.url} />
            <h4>{item.name}</h4>
          </Space>
        );
      },
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "category",
      key: "category",
      render: (category) => category.name,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} ₫`,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, item) => {
        return (
          <Space>
            <Button
              type="primary"
              ghost
              // onClick={() =>
              //   navigate(
              //     generatePath(ROUTES.ADMIN.UPDATE_PRODUCT, { id: item.id })
              //   )
              // }
            >
              Update
            </Button>
            <Button ghost danger>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const renderCategoryOptions = useMemo(() => {
    return categoryList.data.map((item) => {
      return <Select.Option key={item.id}>{item.name}</Select.Option>;
    });
  }, [categoryList.data]);

  const handleFilter = (key, values) => {
    setFilterParams({
      ...filterParams,
      [key]: values,
    });
    dispatch(
      getProductListAction({
        ...filterParams,
        [key]: values,
        page: 1,
        limit: ADMIN_TABLE_LIMIT,
      })
    );
  };

  const handleChangePage = (page) => {
    dispatch(
      getProductListAction({
        ...filterParams,
        page: page,
        limit: ADMIN_TABLE_LIMIT,
      })
    );
  };

  return (
    <S.ProductManagerWrapper>
      <Row justify="space-between">
        <h3>Quản lý sản phẩm</h3>
        <Button
          type="primary"
          onClick={() => navigate(ROUTES.ADMIN.CREATE_PRODUCT)}
        >
          Tạo sản phẩm mới
        </Button>
      </Row>
      <S.FilterWrapper>
        <h5>Bộ lọc sản phẩm:</h5>
        <Row gutter={[16, 16]} style={{ marginTop: "6px" }}>
          <Col span={12}>
            <Input
              placeholder="Tên sản phẩm"
              onChange={(e) => handleFilter("searchKey", e.target.value)}
            />
          </Col>
          <Col span={12}>
            <Select
              mode="multiple"
              allowClear
              onChange={(values) => handleFilter("categoryId", values)}
              placeholder="Loại sản phẩm"
              style={{ width: "100%" }}
            >
              {renderCategoryOptions}
            </Select>
          </Col>
        </Row>
      </S.FilterWrapper>
      <Table
        columns={tableColumn}
        dataSource={productList.data}
        pagination={false}
        rowKey="id"
        loading={productList.load}
      />
      <Row justify="center">
        <Pagination
          current={productList.meta.page}
          pageSize={ADMIN_TABLE_LIMIT}
          total={productList.meta.total}
          onChange={(page) => handleChangePage(page)}
          style={{ margin: "16px auto" }}
        />
      </Row>
    </S.ProductManagerWrapper>
  );
}
export default ProductManagement;
