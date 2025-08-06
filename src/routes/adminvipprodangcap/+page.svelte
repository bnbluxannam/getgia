<script>
  import { onMount } from "svelte";
  import AdminSpinButton from "$lib/components/AdminSpinButton.svelte";

  /**
   * @typedef {Object} Product
   * @property {string} _id
   * @property {string} name
   * @property {string} image
   * @property {number|null} nguyen_kim
   * @property {number|null} dien_may_xanh
   * @property {number|null} cho_lon
   */

  /** @type {Product[]} */
  let products = [];

  /** @type {Partial<Product>} */
  let newProduct = {
    name: "",
    image: "",
    nguyen_kim: null,
    dien_may_xanh: null,
    cho_lon: null
  };

  let editingId = null;
  let loading = true;

  const api = "/api/products";

  /** Load danh sách sản phẩm */
  async function loadProducts() {
    loading = true;
    const res = await fetch(api);
    products = await res.json();
    loading = false;
  }

  /** Thêm sản phẩm */
  async function addProduct() {
    if (!newProduct.name || !newProduct.image) return alert("Nhập tên và ảnh!");

    const res = await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct)
    });

    if (res.ok) {
      await loadProducts();
      resetForm();
    } else {
      alert("Thêm sản phẩm thất bại!");
    }
  }

  /** Bắt đầu sửa */
  function editProduct(product) {
    editingId = product._id;
    newProduct = {
      name: product.name,
      image: product.image,
      nguyen_kim: product.nguyen_kim,
      dien_may_xanh: product.dien_may_xanh,
      cho_lon: product.cho_lon
    };
  }

  /** Cập nhật sản phẩm */
  async function updateProduct() {
    if (!editingId) return;

    const res = await fetch(`${api}/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct)
    });

    if (res.ok) {
      await loadProducts();
      resetForm();
    } else {
      alert("Cập nhật thất bại!");
    }
  }

  /** Xóa sản phẩm */
  async function deleteProduct(product) {
    if (!confirm(`Xóa sản phẩm "${product.name}"?`)) return;

    const res = await fetch(`${api}/${product._id}`, {
      method: "DELETE"
    });

    if (res.ok) {
      await loadProducts();
    } else {
      alert("Xóa thất bại!");
    }
  }

  /** Reset form */
  function resetForm() {
    newProduct = {
      name: "",
      image: "",
      nguyen_kim: null,
      dien_may_xanh: null,
      cho_lon: null
    };
    editingId = null;
  }

  /** @param {number|null} price */
  const formatPrice = (price) => (price ? price.toLocaleString() + "₫" : "N/A");

  onMount(loadProducts);
</script>

<h1>Trang Admin - Quản lý sản phẩm</h1>
<AdminSpinButton />

{#if loading}
  <p>Đang tải dữ liệu...</p>
{:else}
  <table class="admin-table">
    <thead>
      <tr>
        <th>Ảnh</th>
        <th>Tên sản phẩm</th>
        <th>Nguyễn Kim</th>
        <th>Điện Máy Xanh</th>
        <th>Điện Máy Chợ Lớn</th>
        <th>Hành động</th>
      </tr>
    </thead>
    <tbody>
      {#each products as product}
        <tr>
          <td><img src={product.image} alt={product.name} width="80" /></td>
          <td>{product.name}</td>
          <td>{formatPrice(product.nguyen_kim)}</td>
          <td>{formatPrice(product.dien_may_xanh)}</td>
          <td>{formatPrice(product.cho_lon)}</td>
          <td>
            <button on:click={() => editProduct(product)}>Sửa</button>
            <button on:click={() => deleteProduct(product)}>Xóa</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <h2>{editingId ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}</h2>
  <div class="admin-form">
    <input placeholder="Tên sản phẩm" bind:value={newProduct.name} />
    <input placeholder="Đường dẫn ảnh" bind:value={newProduct.image} />
    <input type="number" placeholder="Giá Nguyễn Kim" bind:value={newProduct.nguyen_kim} />
    <input type="number" placeholder="Giá Điện Máy Xanh" bind:value={newProduct.dien_may_xanh} />
    <input type="number" placeholder="Giá Chợ Lớn" bind:value={newProduct.cho_lon} />

    {#if !editingId}
      <button on:click={addProduct}>Thêm sản phẩm</button>
    {:else}
      <button on:click={updateProduct}>Cập nhật sản phẩm</button>
      <button on:click={resetForm}>Hủy</button>
    {/if}
  </div>
{/if}

<style>
  .admin-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  .admin-table th,
  .admin-table td {
    border: 1px solid #ddd;
    padding: 6px;
    text-align: center;
  }
  .admin-form {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
  }
  .admin-form input {
    flex: 1;
    min-width: 150px;
    padding: 6px;
  }
  .admin-form button {
    padding: 6px 12px;
    cursor: pointer;
  }
</style>