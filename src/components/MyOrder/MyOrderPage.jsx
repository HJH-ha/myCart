import Table from "../Common/Table";
import "./MyOrderPage.css";

const MyOrderPage = () => {
  return (
    <section className="align_center myorder_page">
      <Table headings={["내주문", "상품들", "결재금액", "배송상태"]}>
        <tbody>
          <tr>
            <td>1</td>
            <td>iPhone, Power Bank</td>
            <td>1,205,000 원</td>
            <td>배송중</td>
          </tr>
        </tbody>
      </Table>
    </section>
  );
};

export default MyOrderPage;
