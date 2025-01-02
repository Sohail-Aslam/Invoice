import React, { useState } from "react";

function Invoice() {
  const [services, setServices] = useState([
    { description: "", unitPrice: "", quantity: "", discount: "" },
  ]);

  const handleAddService = () => {
    setServices([
      ...services,
      { description: "", unitPrice: "", quantity: "", discount: "" },
    ]);
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index][field] =
      field === "quantity" || field === "unitPrice" || field === "discount"
        ? parseFloat(value) || ""
        : value;
    setServices(updatedServices);
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

    // Total per service after discount
    return total + (unitPrice - discount) * quantity;
  }, 0);
};


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      <h1>Invoice</h1>

      <h2 className="sub-heading heading">Customer Details</h2>
      <div className="input-sub-container">
        <div className="input-container">
          <i className="fas fa-user"></i>
          <input type="text" placeholder="Customer Name" required />
        </div>
        <div className="input-container">
          <i className="fas fa-envelope"></i>
          <input type="email" placeholder="Email" required />
        </div>
        <div className="input-container">
          <i className="fas fa-phone"></i>
          <input type="text" placeholder="Contact" />
        </div>
        <div className="input-container">
          <i className="fas fa-map-marker-alt"></i>
          <input type="text" placeholder="Address" />
        </div>
        <div className="input-container">
          <i className="fas fa-car"></i>
          <input type="text" placeholder="Vehicle Details" />
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
          <hr />
          </div>
        </div>
      ))}

      <div className="buttons">
        <button onClick={handleAddService}>Add Service</button>
        <button 
        >Preview</button>
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
    </div>
  );
}

export default Invoice;
