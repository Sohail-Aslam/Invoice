import React, { useState } from "react";
import { usePDF } from "react-to-pdf";
import "../component/invoice.css";

function Invoice() {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    carName: "",
    carReg: "",
  });
  const [invoice, setInvoice] = useState({
    date: new Date().toISOString().split("T")[0],
    number: `AD${Math.floor(1000 + Math.random() * 9000)}`,
  });

  const [services, setServices] = useState([
    { description: "", unitPrice: "", quantity: "", discount: "" },
  ]);
  const [showPreview, setShowPreview] = useState(false);

  // PDF generation logic

  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  // Handle input change for customer
  const handleCustomerChange = (field, value) => {
    setCustomer({ ...customer, [field]: value });
  };

  // Handle input change for services
  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index][field] =
      field === "quantity" || field === "unitPrice" || field === "discount"
        ? parseFloat(value) || ""
        : value;
    setServices(updatedServices);
  };

  const handleAddService = () => {
    setServices([
      ...services,
      { description: "", unitPrice: "", quantity: "", discount: "" },
    ]);
  };

  const calculateSubtotal = () => {
    return services.reduce((sum, service) => {
      const unitPrice = parseFloat(service.unitPrice) || 0;
      const quantity = parseFloat(service.quantity) || 0;
      return sum + unitPrice * quantity;
    }, 0);
  };

  const calculateTotal = () => {
    return services.reduce((total, service) => {
      const unitPrice = parseFloat(service.unitPrice) || 0;
      const quantity = parseFloat(service.quantity) || 0;
      const discount = parseFloat(service.discount) || 0;
      return total + (unitPrice - discount) * quantity;
    }, 0);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      <h1>Invoice</h1>

      <h2 className="sub-heading heading">Customer Details</h2>
      <div className="input-sub-container">
        <div className="input-container">
          <i className="fas fa-user"></i>
          <input
            type="text"
            placeholder="Customer Name"
            value={customer.name}
            onChange={(e) => handleCustomerChange("name", e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            placeholder="Email"
            value={customer.email}
            onChange={(e) => handleCustomerChange("email", e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <i className="fas fa-phone"></i>
          <input
            type="text"
            placeholder="Contact"
            value={customer.contact}
            onChange={(e) => handleCustomerChange("contact", e.target.value)}
          />
        </div>
        <div className="input-container">
          <i className="fas fa-map-marker-alt"></i>
          <input
            type="text"
            placeholder="Address"
            value={customer.address}
            onChange={(e) => handleCustomerChange("address", e.target.value)}
          />
        </div>
        <div className="input-container">
          <i className="fas fa-car"></i>
          <input
            type="text"
            placeholder="Car Reg #"
            value={customer.carReg}
            onChange={(e) => handleCustomerChange("carReg", e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <i className="fas fa-car"></i>
          <input
            type="text"
            placeholder="Car Name"
            value={customer.carName}
            onChange={(e) => handleCustomerChange("carName", e.target.value)}
          />
        </div>
      </div>

      <h2 className="sub-heading heading">Services Details</h2>
      {services.map((service, index) => (
        <div key={index} className="service-input-container">
          <div className="service-container">
            <input
              type="text"
              placeholder="Description"
              value={service.description}
              onChange={(e) =>
                handleServiceChange(index, "description", e.target.value)
              }
            />
          </div>
          <div className="service-container">
            <input
              type="number"
              placeholder="Unit Price"
              value={service.unitPrice}
              onChange={(e) =>
                handleServiceChange(index, "unitPrice", e.target.value)
              }
            />
          </div>
          <div className="service-container">
            <input
              type="number"
              placeholder="Quantity"
              value={service.quantity}
              onChange={(e) =>
                handleServiceChange(index, "quantity", e.target.value)
              }
            />
          </div>
          <div className="service-container">
            <input
              type="number"
              placeholder="Discount per Unit"
              value={service.discount}
              onChange={(e) =>
                handleServiceChange(index, "discount", e.target.value)
              }
            />
          </div>
        </div>
      ))}

      <div className="buttons">
        <button onClick={handleAddService}>Add Service</button>
        <button onClick={togglePreview}>
          {showPreview ? "Hide Preview" : "Preview"}
        </button>
      </div>

      <h2 className="sub-heading heading">Summary</h2>
      <div className="service-input-container">
        <div className="service-container">
          <input
            type="text"
            placeholder="Subtotal"
            value={`$${calculateSubtotal().toFixed(2)}`}
            readOnly
          />
        </div>
        <div className="service-container">
          <input
            type="text"
            placeholder="Total"
            value={`$${calculateTotal().toFixed(2)}`}
            readOnly
          />
        </div>
      </div>

      {showPreview && (
        <div className="modal-overlay">
          <div className="invoice-holder">
            <div className="invoice-preview" ref={targetRef}>
              <div className="upper-content">
              <header className="invoice-header">
                <div className="header-left">
                  <img
                    src="/headerLogo.png"
                    height="70px"
                    width="160px"
                    alt="logo"
                  />
                  <h1>CAR AID AUTO MOBILE REPAIR SERVICE LLC</h1>
                </div>
                <div className="header-right">
                  <div className="icons">
                    <img
                      src="/companyIcons/user.png"
                      height="14px"
                      width="14px"
                      alt="user"
                    />

                    <p>Manager: Mr Sheraz Hassan</p>
                  </div>
                  <div className="icons">
                    <img
                      src="/companyIcons/Phone.png"
                      height="14px"
                      width="14px"
                      alt="phone"
                    />
                    <p>Mobile: 0559521526, 0551729296</p>
                  </div>
                  <div className="icons">
                    <img
                      src="/companyIcons/Fingerprint.png"
                      height="14px"
                      width="14px"
                      alt="trn"
                    />
                    <p>TRN: 104676144900003</p>
                  </div>
                  <div className="icons">
                    <img
                      src="/companyIcons/Mail.png"
                      height="14px"
                      width="14px"
                      alt="email"
                    />
                    <p>Email: Caraid321@gmail.com</p>
                  </div>
                  <div className="icons">
                    <img
                      src="/companyIcons/Location.png"
                      height="14px"
                      width="14px"
                      alt="location"
                    />
                    <p>
                      Address: Dubai, Al Quoz Industrial Area 1, United Arab
                      Emirates
                    </p>
                  </div>
                </div>
              </header>

              <div className="invoice-body">
                <section className="invoice-to">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                    }}
                  >
                    <h2>Invoice To:</h2>
                    <div className="invoice-to-left">
                      <p>Name: {customer.name}</p>
                      <p>Mobile: {customer.contact}</p>
                      <p>Car Reg. #:{customer.carReg} </p>
                      <p>Car Name: {customer.carName}</p>
                      <p>Email: {customer.email}</p>
                    </div>
                  </div>

                  <div className="invoice-to-right">
                    <div className="invoice-info">
                      <p>Invoice Date: {invoice.date}</p>
                      <p>Invoice No.: {invoice.number}</p>
                    </div>
                  </div>
                </section>

                <table className="invoice-table">
                  <thead>
                    <tr>
                      <th>SL.</th>
                      <th>Description</th>
                      <th>QTY</th>
                      <th>Price</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{service.description}</td>
                        <td>{service.quantity}</td>
                        <td>{service.unitPrice}</td>
                        <td>
                          {(
                            (parseFloat(service.unitPrice) || 0) *
                            (parseFloat(service.quantity) || 0)
                          ).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <section className="invoice-summary">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: "300px",
                      textAlign: "left",
                      width: "200px",
                    }}
                  >
                    <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
                    <p>Discount: ${calculateTotal() - calculateSubtotal()}</p>
                    <p className="total">
                      Total: ${calculateTotal().toFixed(2)}
                    </p>
                  </div>
                  <div className="footer-left">
                    <img
                      src="24-7Logo.png"
                      alt="24/7 Emergency Services"
                      className="emergency-logo"
                    />
                    <p>Service we provide:</p>
                    <ul>
                      <li>Auto Mechanical Repair & Maintenance</li>
                      <li>Auto Electrical Repair & Maintenance</li>
                      <li>Auto Body Shop & Many More Services</li>
                      <li>Auto Mobile Service 24/7 Doorstep</li>
                    </ul>
                  </div>
                </section>

                <footer className="invoice-footer"></footer>
              </div>

              </div>
              <div className="footer-thanks">
                <p>Thank you for choosing Car Aid Auto Repair Dubai!</p>
              </div>
            </div>
          </div>
          <div className="buttons">
            <button onClick={() => toPDF()}>Download PDF</button>
            <button onClick={togglePreview}>Close Preview</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Invoice;
