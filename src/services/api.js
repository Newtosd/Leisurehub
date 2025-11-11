// Mocked API hooks for bookings and payments.
import axios from 'axios';

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

export async function createBooking(booking) {
  await sleep(400);
  return { success: true, bookingId: `bk_${Math.random().toString(36).slice(2,9)}` };
}

export async function createPaymentIntent({ amount }) {
  await sleep(300);
  return { clientSecret: `pi_${Math.random().toString(36).slice(2,9)}_secret_mock` };
}

export async function confirmPayment({ clientSecret }) {
  await sleep(400);
  return { success: true, paymentId: `pay_${Math.random().toString(36).slice(2,9)}` };
}
