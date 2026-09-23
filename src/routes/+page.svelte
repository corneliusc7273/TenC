<script>
    let balance = 705000;
    let expense = 276000+64300;
</script>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap');   
    @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css");
    * {
        font-family: Figtree, sans-serif;
    }
    :global(html, body) {
        background: var(--color-zinc-900);
    }
</style>
<header class="p-16 py-4 border-b border-zinc-800 flex justify-between items-center">
    <h1 class="text-2xl font-black text-emerald-300"><i class="bi bi-cash"></i> X3Funds</h1>
    <div class="flex gap-x-8 text-xl text-zinc-500 font-semibold items-center">
        <a href="/history" class="hover:text-zinc-300"><i class="bi bi-clock-history"></i> History</a>
        <a href="/expenses" class="hover:text-zinc-300"><i class="bi bi-arrow-up"></i>Expenses</a>
        <a href="/admin" class="bg-green-500 border-b-2 border-green-700 text-zinc-50 p-2 py-1 rounded-lg">Admin</a>
    </div>
</header>
<main class="p-16 text-zinc-50">
    <span class="text-2xl ml-0.5">Class Account</span>
    <h1 class="text-7xl font-bold mt-2 mb-4"><span class="text-zinc-500">Rp </span>{balance.toLocaleString()}</h1>
    <span class="text-xl font-light bg-zinc-800 rounded-full px-3 py-1 border-2 text-red-400 border-zinc-700">
        <span class="text-zinc-500">Expenses:</span> Rp {expense.toLocaleString()}
    </span>
    <div class="flex gap-x-8">
        <div class="flex-2 mt-16">
            <div class="flex gap-x-2 justify-between">
                <h1 class="text-xl font-bold">Accounts</h1>
                <button class="rounded-full px-2 text-xl pr-3 border border-zinc-700 cursor-pointer hover:scale-105 scale-100 duration-150 bg-zinc-800 text-zinc-500"><i class="bi bi-filter"></i> Unpaid</button>
            </div>
            <div class="mt-4 flex-2 border border-zinc-700 bg-zinc-800 rounded-xl overflow-hidden">
                <table class="table-auto border-collapse w-full">
                    <thead>
                        <tr class="border-b-2 border-zinc-700 text-zinc-500">
                            <th class="text-2xl px-4 text-left py-2 rounded-tl">Name</th>   
                            <th class="text-2xl px-4 text-left py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody class="bg-zinc-900">
                        <tr class="border-b border-zinc-700">
                            <td class="p-4 text-2xl py-4">Cornelius Christian</td>
                            <td class="p-4 text-2xl py-4 font-bold"><span class="font-bold rounded-full text-xl px-2 py-1 bg-red-900 pr-3 border-b-2 border-red-950"><i class="bi bi-arrow-down"></i> Rp.20,000 debt</span></td>
                        </tr>
                        <tr class="border-b border-zinc-700">
                            <td class="p-4 text-2xl py-4">Daniel Chow Huang</td>
                            <td class="p-4 text-2xl py-4"><span class="font-bold rounded-full text-xl px-2 py-1 bg-blue-900 border-b-2 pr-3 border-blue-950"><i class="bi bi-chevron-double-right"></i> Paid-in-advance</span></td>
                        </tr>
                        <tr>
                            <td class="p-4 text-2xl py-4">Daniel Chow Huang</td>
                            <td class="p-4 text-2xl py-4"><span class="font-bold rounded-full text-xl px-2 py-1 bg-green-900 border-b-2 pr-3 border-green-950"><i class="bi bi-check"></i> Fully Paid</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="flex-1">
            <h2 class="text-xl mt-16 font-bold rounded-xl bg-zinc-800 p-2 px-4 border border-zinc-700 border-b-0 rounded-b-none">Recent Transactions</h2>
            <div class="border border-b-0 border-zinc-700 p-4 flex gap-x-2 text-xl">
                <i class="bi bi-tag-fill text-yellow-600"></i>
                <div class="flex w-full justify-between">
                    <h2 class="font-bold text">Class Stationery</h2>
                    <h2 class="font-light text">Rp 64,300</h2>
                </div>
            </div>
            <div class="border border-zinc-700 p-4 flex gap-x-2 text-xl rounded-b-xl">
                <i class="bi bi-bag-fill text-green-600"></i>
                <div class="flex w-full justify-between">
                    <h2 class="font-bold text">Class Equipments</h2>
                    <h2 class="font-light text">Rp 276,000</h2>
                </div>
            </div>
        </div>
    </div>
</main>