<script>
  let name = '';
  let image = '';
  let nguyen_kim = '';
  let dien_may_xanh = '';
  let cho_lon = '';

  let message = '';
  
  async function handleSubmit() {
    const product = {
      name,
      image,
      nguyen_kim: nguyen_kim ? Number(nguyen_kim) : null,
      dien_may_xanh: dien_may_xanh ? Number(dien_may_xanh) : null,
      cho_lon: cho_lon ? Number(cho_lon) : null
    };

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });

    const data = await res.json();
    message = data.message || 'Đã gửi!';
    
    // Reset form
    name = image = nguyen_kim = dien_may_xanh = cho_lon = '';
  }
</script>

<h1 class="text-xl font-bold mb-4">Thêm sản phẩm mới</h1>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
  <div>
    <label for="name">Tên sản phẩm:</label>
    <input id="name" bind:value={name} class="border p-2 w-full" required />
  </div>

  <div>
    <label for="image">Link ảnh:</label>
    <input id="image" bind:value={image} class="border p-2 w-full" required />
  </div>

  <div>
    <label for="nguyen_kim">Giá Nguyễn Kim:</label>
    <input id="nguyen_kim" type="number" bind:value={nguyen_kim} class="border p-2 w-full" />
  </div>

  <div>
    <label for="dien_may_xanh">Giá Điện Máy Xanh:</label>
    <input id="dien_may_xanh" type="number" bind:value={dien_may_xanh} class="border p-2 w-full" />
  </div>

  <div>
    <label for="cho_lon">Giá Chợ Lớn:</label>
    <input id="cho_lon" type="number" bind:value={cho_lon} class="border p-2 w-full" />
  </div>

  <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Thêm</button>
</form>

{#if message}
  <p class="mt-4 text-green-600">{message}</p>
{/if}