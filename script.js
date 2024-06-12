document.getElementById('add-service').addEventListener('click', addService);
document.getElementById('receipt-form').addEventListener('submit', generateReceipt);
document.getElementById('print-receipt').addEventListener('click', printReceipt);

let serviceCount = 1;

function addService() {
    serviceCount++;
    const serviceDiv = document.createElement('div');
    serviceDiv.className = 'service';
    serviceDiv.innerHTML = `
        <label for="service-description-${serviceCount}">Description</label>
        <input type="text" id="service-description-${serviceCount}" required>
        <label for="service-quantity-${serviceCount}">Quantity</label>
        <input type="number" id="service-quantity-${serviceCount}" required>
        <label for="service-unit-price-${serviceCount}">Unit Price</label>
        <input type="number" id="service-unit-price-${serviceCount}" step="0.01" required>
    `;
    document.getElementById('services').appendChild(serviceDiv);
}

function generateReceipt(event) {
    event.preventDefault();

    const logo = document.getElementById('logo').files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const logoDataUrl = e.target.result;

        const businessName = document.getElementById('business-name').value;
        const businessAddress = document.getElementById('business-address').value;
        const businessPhone = document.getElementById('business-phone').value;
        const businessEmail = document.getElementById('business-email').value;
        const businessWebsite = document.getElementById('business-website').value;

        const receiptNumber = document.getElementById('receipt-number').value;
        const taxPercentage = parseFloat(document.getElementById('tax-percentage').value);
        const tip = parseFloat(document.getElementById('tip').value);

        const clientName = document.getElementById('client-name').value;
        const clientAddress = document.getElementById('client-address').value;
        const clientPhone = document.getElementById('client-phone').value;
        const clientEmail = document.getElementById('client-email').value;

        let services = '';
        let subtotal = 0;

        for (let i = 1; i <= serviceCount; i++) {
            const description = document.getElementById(`service-description-${i}`).value;
            const quantity = parseInt(document.getElementById(`service-quantity-${i}`).value);
            const unitPrice = parseFloat(document.getElementById(`service-unit-price-${i}`).value);
            const totalPrice = quantity * unitPrice;
            subtotal += totalPrice;

            services += `
                <tr>
                    <td>${description}</td>
                    <td>${quantity}</td>
                    <td>${unitPrice.toFixed(2)}</td>
                    <td>${totalPrice.toFixed(2)}</td>
                </tr>
            `;
        }

        const taxAmount = (subtotal * taxPercentage) / 100;
        const totalAmount = subtotal + taxAmount + tip;
        const paymentMethod = document.getElementById('payment-method').value;
        const paymentReceived = parseFloat(document.getElementById('payment-received').value);
        const balanceDue = totalAmount - paymentReceived;
        const signature = document.getElementById('signature').value;

        const receiptContent = `
            <div class="receipt-header">
                <img src="${logoDataUrl}" alt="Logo">
                <div>
                    <p><strong>${businessName}</strong></p>
                    <p>${businessAddress}</p>
                    <p>${businessPhone}</p>
                    <p>${businessEmail}</p>
                    <p>${businessWebsite}</p>
                </div>
            </div>
            <hr>
            <p><strong>Receipt Number:</strong> ${receiptNumber}</p>
            <p><strong>Client Name:</strong> ${clientName}</p>
            <p><strong>Client Address:</strong> ${clientAddress}</p>
            <p><strong>Client Phone:</strong> ${clientPhone}</p>
            <p><strong>Client Email:</strong> ${clientEmail}</p>
            <hr>
            <table class="receipt-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${services}
                </tbody>
            </table>
            <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
            <p><strong>Tax (${taxPercentage}%):</strong> $${taxAmount.toFixed(2)}</p>
            <p><strong>Tip:</strong> $${tip.toFixed(2)}</p>
            <p><strong>Total:</strong> $${totalAmount.toFixed(2)}</p>
            <p><strong>Payment Method:</strong> ${paymentMethod}</p>
            <p><strong>Payment Received:</strong> $${paymentReceived.toFixed(2)}</p>
            <p><strong>Balance Due:</strong> $${balanceDue.toFixed(2)}</p>
            <p><strong>Signature:</strong> ${signature}</p>
            <div class="receipt-footer" style="background-color: #007bff;">
                <p>Thank you for your business!</p>
            </div>
        `;

        document.getElementById('receipt-content').innerHTML = receiptContent;
        document.getElementById('receipt').classList.remove('hidden');
    };

    if (logo) {
        reader.readAsDataURL(logo);
    } else {
        generateReceiptContent();
    }
}

function printReceipt() {
    window.print();
}

function generateReceiptContent() {
    const businessName = document.getElementById('business-name').value;
    const businessAddress = document.getElementById('business-address').value;
    const businessPhone = document.getElementById('business-phone').value;
    const businessEmail = document.getElementById('business-email').value;
    const businessWebsite = document.getElementById('business-website').value;

    const receiptNumber = document.getElementById('receipt-number').value;
    const taxPercentage = parseFloat(document.getElementById('tax-percentage').value);
    const tip = parseFloat(document.getElementById('tip').value);

    const clientName = document.getElementById('client-name').value;
    const clientAddress = document.getElementById('client-address').value;
    const clientPhone = document.getElementById('client-phone').value;
    const clientEmail = document.getElementById('client-email').value;

    let services = '';
    let subtotal = 0;

    for (let i = 1; i <= serviceCount; i++) {
        const description = document.getElementById(`service-description-${i}`).value;
        const quantity = parseInt(document.getElementById(`service-quantity-${i}`).value);
        const unitPrice = parseFloat(document.getElementById(`service-unit-price-${i}`).value);
        const totalPrice = quantity * unitPrice;
        subtotal += totalPrice;

        services += `
            <tr>
                <td>${description}</td>
                <td>${quantity}</td>
                <td>${unitPrice.toFixed(2)}</td>
                <td>${totalPrice.toFixed(2)}</td>
            </tr>
        `;
    }

    const taxAmount = (subtotal * taxPercentage) / 100;
    const totalAmount = subtotal + taxAmount + tip;
    const paymentMethod = document.getElementById('payment-method').value;
    const paymentReceived = parseFloat(document.getElementById('payment-received').value);
    const balanceDue = totalAmount - paymentReceived;
    const signature = document.getElementById('signature').value;

    const receiptContent = `
        <div class="receipt-header">
            <img src="#" alt="Logo">
            <div>
                <p><strong>${businessName}</strong></p>
                <p>${businessAddress}</p>
                <p>${businessPhone}</p>
                <p>${businessEmail}</p>
                <p>${businessWebsite}</p>
            </div>
        </div>
        <hr>
        <p><strong>Receipt Number:</strong> ${receiptNumber}</p>
        <p><strong>Client Name:</strong> ${clientName}</p>
        <p><strong>Client Address:</strong> ${clientAddress}</p>
        <p><strong>Client Phone:</strong> ${clientPhone}</p>
        <p><strong>Client Email:</strong> ${clientEmail}</p>
        <hr>
        <table class="receipt-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${services}
            </tbody>
        </table>
        <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
        <p><strong>Tax (${taxPercentage}%):</strong> $${taxAmount.toFixed(2)}</p>
        <p><strong>Tip:</strong> $${tip.toFixed(2)}</p>
        <p><strong>Total:</strong> $${totalAmount.toFixed(2)}</p>
        <p><strong>Payment Method:</strong> ${paymentMethod}</p>
        <p><strong>Payment Received:</strong> $${paymentReceived.toFixed(2)}</p>
        <p><strong>Balance Due:</strong> $${balanceDue.toFixed(2)}</p>
        <p><strong>Signature:</strong> ${signature}</p>
        <div class="receipt-footer" style="background-color: #007bff;">
            <p>Thank you for your business!</p>
        </div>
    `;

    document.getElementById('receipt-content').innerHTML = receiptContent;
    document.getElementById('receipt').classList.remove('hidden');
}
