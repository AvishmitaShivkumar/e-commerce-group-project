# *The name of our store here*


## Endpoints

| Endpoint       | Method   | Description                                       | Handler |
| -------------- | -------- | ------------------------------------------------- |----------|
| `/api/allcategories`| `GET`   | Returns an array with all different item's categories   |  getCategories|
| `/api/companies`   | `GET`    | Returns array with all Companies       | getCompanies |
| `/api/company/:_id`   | `GET`  | Returns a single company based on _id param   | getCompany |
| `/api/item/:_id`   | `GET` | Returns a single item based on _id param  |getItem |
| `/api/items` | `GET`    | Returns Array of all items     | getitems  |
| `/api/users`     | `GET`   | Returns Array of all users  | getUsers |
| `/api/user/:_id` | `GET`    | Returns a single user based on the _id param | getUser |
| `/api/user/updatepassword`   | `PATCH`    | Allows to change password | updatePassword  |
| `/api/signup`       | `POST`    | Adds a new user to users collection   | addUser |
| `api/delete/cart/:userId/items/:itemId` | `DELETE` | Deletes an item from the cart | deleteCartItem |
| `/api/cartcollection` | `POST` | Adds item to cart or +1 if it already exists | cartCollection|
| `*` | `*` |                   |  |
| `/api/order` | `POST` | Creates an order and adds it to the cart (??)  |  |
| `*` | `*` |                   |  |
| `*` | `*` |                   |  |
| `*` | `*` |                   |  |


#### Body expected

For update password requests( PATCH, updatePassword):

```json
{
	"email": "<Current Email>",
	"password": "<Current Password>",
	 "newPassword": "<New Password>"
	}
```

For new user requests (POST, addUser):

```json
{
	"firstName": "<First name of user>",
	"lastName": "<Last name of user>",
	"email": "<User's email> (cant be already registered)",
	"password": "<Password chosen>"
	}
```

For * requests:

```json
{

}
```


