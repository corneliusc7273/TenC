<script>
	import { invalidateAll } from "$app/navigation";
    import { DateTime } from "luxon";
    import { onMount } from "svelte";
    let firstPayment = DateTime.utc(2026, 7, 20);
    let cycles = Math.round(DateTime.now().diff(firstPayment, "weeks").weeks/2);
    let { data } = $props();
    let expense = 276000+64300;
    let payment_id = 1;
    let payment_name = $state("Cornel");
    let payment_amount = $state();
    let isAuthenticated = $derived(data.isTreasurer);
    let dialogVisible = $state(false);
    let isFilter = $state(false);
    async function addTransaction() {
        const res = await fetch('/api/payments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                student_id: payment_id,
                amount: payment_amount,
                payment_type: "CASH"
            })
        })
        const data = await res.json();
        payment_amount = null
        if (res.ok) {
            closeDialog();
            await invalidateAll();
        }else {
            alert("Error!", data.error);
        }
    }
    function showDialog(i, name) {
        payment_id = i
        payment_name = name
        dialogVisible = true
    }
    function closeDialog() {
        dialogVisible = false
    }
    async function logout() {
        const res = await fetch('/api/logout', {
            method: 'POST'
        })
        const data = await res.json();
        if (res.ok) {
            await invalidateAll();
        }
    }
    async function authenticate() {
        let password = prompt("Login:");
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({password})
        })
        const data = await res.json();
        if (res.ok) {
            alert("Login successful!")
            await invalidateAll();
        }else{
            alert("Login failed."+data.error)
        }
    }
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

{#if dialogVisible}
<div class="h-full w-full fixed bg-black/50 z-10 flex justify-center items-center">
    <div class="w-auto h-auto p-8 rounded-xl border-2 border-zinc-800 bg-zinc-900">
        <div class="flex justify-between">
            <h2 class="font-bold text-center text-zinc-50 text-xl">{payment_name}'s <span class="font-bold">Payment</span></h2>
        </div>
        <div class="flex rounded-2xl p-6 text-3xl font-black text-center bg-zinc-800 w-full mt-4 outline-none text-zinc-50 border-t-2 border-zinc-600">
            <span>Rp</span>
            <input type="number" placeholder="10,000" class="outline-none" bind:value={payment_amount}>
        </div>
        <div class="flex mt-4 gap-x-2">
            <button onclick={() => payment_amount = 5000} class="hover:scale-98 duration-150 cursor-pointer hover:brightness-90 rounded-full px-4 py-1 font-bold text-zinc-50 bg-linear-to-b from-zinc-700 to-zinc-800 border-t-2 border-zinc-500">Rp5,000</button>
            <button onclick={() => payment_amount = 10000} class="hover:scale-98 duration-150 cursor-pointer hover:brightness-90 rounded-full px-4 py-1 font-bold text-zinc-50 bg-linear-to-b from-zinc-700 to-zinc-800 border-t-2 border-zinc-500">Rp10,000</button>
            <button onclick={() => payment_amount = 20000} class="hover:scale-98 duration-150 cursor-pointer hover:brightness-90 rounded-full px-4 py-1 font-bold text-zinc-50 bg-linear-to-b from-zinc-700 to-zinc-800 border-t-2 border-zinc-500">Rp20,000</button>
            <button onclick={() => payment_amount = 50000} class="hover:scale-98 duration-150 cursor-pointer hover:brightness-90 rounded-full px-4 py-1 font-bold text-zinc-50 bg-linear-to-b from-zinc-700 to-zinc-800 border-t-2 border-zinc-500">Rp50,000</button>
        </div>
        <div class="flex gap-x-4">
            <button onclick={closeDialog} class="w-full rounded-xl bg-linear-to-b from-zinc-700 to-zinc-800 text-zinc-100 border-t-2 border-zinc-500 font-bold p-2 text-xl mt-4 cursor-pointer hover:scale-98 duration-150 hover:brightness-75">Cancel</button>
            <button onclick={()=> addTransaction()} class="w-full rounded-xl bg-linear-to-b from-green-500 to-green-700 text-zinc-100 border-t-2 border-green-300 font-bold p-2 text-xl mt-4 cursor-pointer hover:scale-98 duration-150 hover:brightness-75">Add payment <i class="bi bi-cash fill"></i></button>
        </div>
    </div>
</div>
{/if}

<header class="p-16 py-4 border-b-2 border-zinc-800 flex justify-between items-center">
    <h1 class="text-2xl font-black text-emerald-300"><i class="bi bi-cash"></i> X3Funds</h1>
    <div class="flex gap-x-8 text-xl text-zinc-500 font-semibold items-center">
        <a href="/funds" class="hover:text-zinc-300"><i class="bi bi-clock-history"></i> History</a>
        <a href="/funds" class="hover:text-zinc-300"><i class="bi bi-arrow-up"></i>Expenses</a>
        {#if isAuthenticated}
            <button onclick={() => logout()} class="from-green-500 to-green-700 bg-linear-to-b border-t-2 border-green-300 text-zinc-50 p-3 hover:scale-98 hover:brightness-50 duration-150 py-1 rounded-lg"><i class="bi bi-unlock-fill mr-2"></i>Admin</button>
        {:else}
            <button onclick={() => authenticate()} class="from-zinc-500 to-zinc-700 bg-linear-to-b border-t-2 border-zinc-300 text-zinc-50 p-3 hover:scale-98 hover:brightness-50 duration-150 py-1 rounded-lg"><i class="bi bi-lock-fill mr-2"></i>Admin</button>
        {/if}
    </div>
</header>
<main class="p-16 text-zinc-50">
    <span class="text-2xl ml-0.5">Class Account</span>
    <h1 class="text-7xl font-bold mt-2 mb-4"><span class="text-zinc-500">Rp </span>{(data.totalIncome - expense).toLocaleString()}</h1>
    <span class="text-xl font-light bg-zinc-800 rounded-full px-3 py-1 border-2 text-red-400 border-zinc-700">
        <span class="text-zinc-500">Expenses:</span> Rp {expense.toLocaleString()}
    </span>
    <div class="flex gap-x-8">
        <div class="flex-2 mt-16">
            <div class="flex gap-x-2 justify-between bg-zinc-800 p-2 px-4 rounded-xl border border-zinc-700">
                <h1 class="text-xl font-bold">Accounts</h1>
                <button onclick={() => isFilter = !isFilter} class:bg-zinc-700={isFilter} class:bg-zinc-800={!isFilter} class="rounded-full px-2 text-lg pr-3 border border-zinc-700 cursor-pointer hover:scale-105 scale-100 duration-150 text-zinc-100"><i class="bi bi-filter"></i> Unpaid</button>
            </div>
            <div class="mt-4 flex-2 border border-zinc-700 bg-zinc-800 rounded-xl overflow-hidden">
                <table class="table-auto border-collapse w-full">
                    <thead>
                        <tr class="border-b-2 border-zinc-700 text-zinc-400">
                            <th class="text-xl px-4 text-left py-2 rounded-tl">Name</th>   
                            <th class="text-xl px-4 text-left py-2">Status</th>
                            {#if isAuthenticated}
                            <th class="text-xl pl-4 text-right pr-4 py-2">Action</th>
                            {/if}
                        </tr>
                    </thead>
                    <tbody class="bg-zinc-900">
                        {#each data.studentTotals as student}
                        {#if (!isFilter) || (isFilter && student.total_paid < cycles*10000)}
                        <tr class="border-b border-zinc-700">
                            <td class="p-4 text-xl py-4">{student.name}</td>
                            {#if student.total_paid < cycles*10000}
                                <td class="p-4 text-xl py-4"><span class="font-bold rounded-full text-xl px-2 py-1 bg-red-900 border-b-2 pr-3 border-red-950"><i class="bi bi-arrow-down"></i> Rp{(cycles*10000-student.total_paid).toLocaleString()} debt</span></td>
                            {:else if student.total_paid == cycles*10000 && !isFilter}
                                <td class="p-4 text-xl py-4"><span class="font-bold rounded-full text-xl px-2 py-1 bg-green-900 border-b-2 pr-3 border-green-950"><i class="bi bi-check"></i> Fully Paid</span></td>
                            {:else if student.total_paid > cycles*10000 && !isFilter}
                                <td class="p-4 text-xl py-4"><span class="font-bold rounded-full text-xl px-2 py-1 bg-blue-900 border-b-2 pr-3 border-blue-950"><i class="bi bi-chevron-double-right"></i> Paid-in-advance</span></td>
                            {/if}
                            {#if isAuthenticated}
                            <td class="p-3 items-center flex justify-end">
                                <button onclick={() => showDialog(student.id, student.name)} class="cursor-pointer hover:brightness-90 hover:scale-95 duration-150 rounded-lg px-3 bg-linear-to-b from-zinc-700 to-zinc-800 p-2"><i class="bi bi-plus-lg rounded-lg"></i></button>
                            </td>
                            {/if}
                        </tr>
                        {/if}
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
        <div class="flex-1">
            <h2 class="text-xl mt-16 font-bold rounded-xl bg-zinc-800 p-2 px-4 border border-zinc-700 border-b-0 rounded-b-none">Recent Expenses</h2>
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

            <h2 class="text-xl mt-4 font-bold rounded-xl bg-zinc-800 p-2 px-4 border border-zinc-700 border-b-0 rounded-b-none">
  Recent Payments
</h2>

{#each data.latestPayments as payment, i}
  <div 
    class="border border-zinc-700 p-4 flex gap-x-2 text-xl {i === data.latestPayments.length - 1 ? 'rounded-b-xl' : 'border-b-0'}"
  >
    <i class="bi bi-cash-stack text-green-500"></i>
    <div class="flex w-full justify-between">
      <h2 class="font-bold text">{payment.name}</h2>
      <h2 class="font-light text">Rp {payment.amount.toLocaleString('en-US')}</h2>
    </div>
  </div>
{:else}
  <div class="border border-zinc-700 p-4 text-zinc-400 rounded-b-xl text-xl">
    No recent transactions found.
  </div>
{/each}
        </div>
    </div>
</main>