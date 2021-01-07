class FilterableProductTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false,
    }
  }
  
    setFilterText = (e) => {
      this.setState({filterText: e})
    }
    setInStockOnly = (e) => {
      this.setState({inStockOnly: e})
    }
  
  render() {
    return(
      <React.Fragment>
        <SearchBar 
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          setFilterText={this.setFilterText}
          setInStockOnly={this.setInStockOnly}
          />
          
        <ProductTable 
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          />
      </React.Fragment>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props){
    super(props);
  }
  
  setText = (e) => {
      return(
        this.props.setFilterText(e.target.value)
      )
    }
    
    setInStockOnly = (e) => {
      return(
      this.props.setInStockOnly(e.target.checked))
    }
  
  render() {
    return(
      <React.Fragment>
        <input 
          type="text" 
          placeholder="Search ..." 
          value={this.props.filterText}
          onChange={this.setText}></input>
        <div>
          <input 
            type="checkbox" 
            checked={this.props.inStockOnly}
            onChange={this.setInStockOnly}/>
           Only show products in stock
        </div>
      </React.Fragment>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    let { products, filterText, inStockOnly } = this.props;
    let productArray = [];
    let lastCat = null;
    
    products.map((item) => {
      
      if(item.name.includes(filterText)){
        return;
      }
      
      if(!item.stocked && inStockOnly){
        return;
      }
      
      if(item.category !== lastCat){
        productArray.push(
          <ProductCategoryRow 
            category={item.category} 
            key={item.category}
          />)
        lastCat = item.category
      };
      
      productArray.push(
        <ProductRow 
          name={item.name}
          price={item.price}
          stocked={item.stocked}
          key={item.name}/>)
    });
    
    return(
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {productArray}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

class ProductCategoryRow extends React.Component {
  render() {
    return(
      <React.Fragment>
        <tr>
          <th colSpan="2">
            {this.props.category}
          </th>
        </tr>
      </React.Fragment>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const { name , price , stocked} = this.props;
    const inStock = stocked? name : <span style={{color:"red"}}>{name}</span>;
    return(
      <React.Fragment>
        <tr>
          <td>
            {inStock}
          </td>
          <td>
            {price}
          </td>
        </tr>
      </React.Fragment>
    );
  }
}



const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
 
ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);
