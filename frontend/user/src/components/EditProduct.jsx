import React, { useState } from 'react';
import { ID, Permission, Role } from 'appwrite'
import { client, apiProductID, databaseID, databases } from '../appwrite/config';
// import { useAppwrite } from 'react-appwrite';


function EditProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
  })

  const [subscriptionPlans, setSubscriptionPlans] = useState(
    [
      // { name: "Free Plan", price: 0, request: 100, type: 1},
      // { name: "Stater Plan", price: 9.99, request: 5000, type: 1 },
      
    ]
  )

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubscriptionPlanChange = (event, index) => {
    const { name, value } = event.target;
    const plans = [...subscriptionPlans];
    plans[index] = { ...plans[index], [name]: value };
    setSubscriptionPlans(plans);
  };

  const handleAddSubscriptionPlan = () => {
    setSubscriptionPlans([
      ...subscriptionPlans,
      { name: "", price: 0, type: 1 },
    ]);
  };

  const handleAddCustomPlan = () => {
    const plans = [...subscriptionPlans];
    plans.push({ name: "Custom Plan", type: 2 });
    setSubscriptionPlans(plans);
  }

  const handleRemoveSubscriptionPlan = (index) => {
    const plans = [...subscriptionPlans];
    plans.splice(index, 1);
    setSubscriptionPlans(plans);
  };

  const handleDeleteProduct = () => {
    // deleteProduct(product.id);
    // redirect to product list page
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // update the product document in Appwrite database
      await databases.createDocument(databaseID, apiProductID, ID.unique(), {
        name: product.name,
        description: product.description,
        subscriptionPlans: subscriptionPlans.map(plan => JSON.stringify(plan))
      }
      );
    } catch (error) {
      console.error(error);
    }
    // const editedProduct = { ...product, subscriptionPlans };
    // editProduct(editedProduct);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        API Name:
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          name="description"
          value={product.description}
          onChange={handleInputChange}
          rows={5}
          cols={50}
        />
      </label>
      <h4>Subscription Plans:</h4>
      {subscriptionPlans.map((plan, index) => (
        <div key={index}>
          <label>
            Plan Name:
            <input
              type="text"
              name="name"
              value={plan.name}
              onChange={(event) => handleSubscriptionPlanChange(event, index)}
            />
          </label>
          <br />
          {plan.type === 1 && (
            <div>
              <label>
                Plan Price:
                <input
                  type="number"
                  name="price"
                  value={plan.price}
                  onChange={(event) => handleSubscriptionPlanChange(event, index)}
                />
              </label>
              <br />
            </div>
          )}
          
          {plan.type === 1 && (
            <div>
              <label>
                Request per Month:
                <input
                  type="number"
                  name="request"
                  value={plan.request}
                  onChange={(event) => handleSubscriptionPlanChange(event, index)}
                />
              </label>
              <br />
            </div>
          )}
          <br />
          <button type="button" onClick={() => handleRemoveSubscriptionPlan(index)}>
            Remove Plan
          </button>
          <hr />
        </div>
      ))}
      <button type="button" onClick={handleAddSubscriptionPlan}>
        Add Plan
      </button>
      <button type="button" onClick={handleAddCustomPlan}>
        Add Custom Plan
      </button>
      <br />
      <button type="submit">Save Changes</button>
      <br />
      <button type="button" onClick={handleDeleteProduct}>
        Delete Product
      </button>
    </form>
  );
}

export default EditProduct;
