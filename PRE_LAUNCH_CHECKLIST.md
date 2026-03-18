# Code Craft AI - Pre-Launch Checklist

Use this to track progress toward 48-hour launch.

---

## ✅ Phase 1: Core MVP (COMPLETE - 2 hours)

- [x] Next.js project scaffold
- [x] Landing page with hero
- [x] Gallery with 10 templates
- [x] Product detail pages
- [x] Stripe checkout form
- [x] Admin dashboard (password-protected)
- [x] API endpoints
- [x] TypeScript strict mode
- [x] Tailwind responsive design
- [x] Production build passes
- [x] Git initialized with 4 commits
- [x] Documentation complete

**Status**: ✅ DONE | Time: ~2 hours | Owner: Rocko

---

## ⏳ Phase 2: Deployment (NEXT - Est. 1 hour)

### GitHub Setup
- [ ] Create GitHub repo: `code-craft-ai`
- [ ] Clone locally
- [ ] Push Rocko's code to GitHub
- [ ] Add `.gitignore` (already in repo)
- [ ] Verify all commits pushed

### Vercel Deployment
- [ ] Login to Vercel (vercel.com)
- [ ] Import GitHub repo
- [ ] Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] Add `STRIPE_SECRET_KEY`
- [ ] Add `NEXT_PUBLIC_APP_URL`
- [ ] Add `ADMIN_PASSWORD`
- [ ] Click Deploy
- [ ] Wait for build to complete (2-3 min)
- [ ] Visit live URL
- [ ] Test homepage loads
- [ ] Test product page loads
- [ ] Test admin login

**Status**: ⏳ PENDING | Estimated time: 1 hour | Owner: AJ

**Live URL will be**: `https://code-craft-ai.vercel.app`

---

## ⏳ Phase 3: Content & Stripe (Est. 4 hours)

### Stripe Setup
- [ ] Get real Stripe test keys from https://dashboard.stripe.com/apikeys
- [ ] Update Vercel env vars with real keys
- [ ] Redeploy Vercel
- [ ] Test with card `4242 4242 4242 4242`
- [ ] Test declined card `4000 0000 0000 0002`
- [ ] Verify success redirect works
- [ ] Verify cancel redirect works

### Template Content
- [ ] Prepare 10 template files (ZIP format)
- [ ] Name them clearly (e.g., `react-admin-dashboard.zip`)
- [ ] Upload to S3 bucket or CDN
- [ ] Get download URLs
- [ ] Update `lib/templates.ts` with real URLs
- [ ] Push to GitHub
- [ ] Verify Vercel auto-redeploy

**Status**: ⏳ PENDING | Estimated time: 4 hours | Owner: AJ

---

## ⏳ Phase 4: Testing (Est. 2 hours)

### Functional Testing
- [ ] Test homepage gallery loads all 10 templates
- [ ] Click each product → verify details load
- [ ] Click "Buy Now" → verify checkout form appears
- [ ] Enter email → verify form validates
- [ ] Test Stripe checkout with test card
- [ ] Verify success page shows
- [ ] Verify email delivery (if SendGrid set up)
- [ ] Verify file download link works

### Admin Dashboard Testing
- [ ] Navigate to `/admin`
- [ ] Enter password: `admin123`
- [ ] Verify login succeeds
- [ ] Verify stats display (revenue, orders, etc.)
- [ ] Verify "Recent Orders" table shows test purchase
- [ ] Test logout
- [ ] Verify session cleared

### Responsive Design Testing
- [ ] Test on desktop (1920x1080)
- [ ] Test on tablet (768px)
- [ ] Test on mobile (375px)
- [ ] Verify hero section looks good
- [ ] Verify gallery cards are responsive
- [ ] Verify checkout form is mobile-friendly
- [ ] Verify admin dashboard is usable on mobile

### Performance Testing
- [ ] Check Lighthouse score (target: >90)
- [ ] Verify page load <3s
- [ ] Check Core Web Vitals
- [ ] Test with slow 4G (DevTools)

**Status**: ⏳ PENDING | Estimated time: 2 hours | Owner: Both

---

## ⏳ Phase 5: Backend Integration (Est. 6 hours)

### AWS Setup
- [ ] Create S3 bucket for templates
- [ ] Create DynamoDB table for orders
- [ ] Create Lambda function for payment processing
- [ ] Set up API Gateway
- [ ] Configure CloudFront (optional)

### SendGrid Integration
- [ ] Get SendGrid API key
- [ ] Set `SENDGRID_API_KEY` in Vercel env
- [ ] Create email template
- [ ] Test transactional email on purchase
- [ ] Verify download link in email

### Update API Routes
- [ ] Modify `/api/checkout` to call Lambda
- [ ] Modify `/api/admin/stats` to query DynamoDB
- [ ] Add order save to DynamoDB
- [ ] Add email send via SendGrid
- [ ] Add S3 signed URL generation
- [ ] Test end-to-end flow

### Error Handling
- [ ] Handle payment failures
- [ ] Handle file not found errors
- [ ] Add logging/monitoring
- [ ] Set up Sentry (optional)

**Status**: ⏳ PENDING | Estimated time: 6 hours | Owner: AJ

---

## ⏳ Phase 6: Pre-Launch (Est. 2 hours)

### Final Testing
- [ ] Full regression testing
- [ ] Load testing (simulate multiple users)
- [ ] Security audit
- [ ] Check all error messages are helpful
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)

### Marketing Setup
- [ ] Create Twitter thread about launch
- [ ] Set up Product Hunt (optional)
- [ ] Create launch announcement email
- [ ] Identify launch time & timezone
- [ ] Schedule posts (or plan for manual push)

### Go-Live Preparation
- [ ] Create runbook for launch day
- [ ] Set up monitoring/alerts
- [ ] Prepare customer support responses
- [ ] Verify analytics tracking (Google Analytics, Mixpanel, etc.)
- [ ] Test support email inbox

### Domain (Optional)
- [ ] If using custom domain, set up DNS
- [ ] Verify HTTPS/SSL works
- [ ] Test domain-based email sender

**Status**: ⏳ PENDING | Estimated time: 2 hours | Owner: Both

---

## ✨ Phase 7: Launch Day (Est. 1 hour)

### 30 Minutes Before Launch
- [ ] Final system health check
- [ ] Verify all monitoring is live
- [ ] Confirm Stripe keys are live mode (or staying on test)
- [ ] Do a test purchase yourself
- [ ] Have support team ready

### Launch Time
- [ ] Push Twitter announcement
- [ ] Send launch email
- [ ] Monitor for errors/issues
- [ ] Respond to early customers
- [ ] Track metrics (visitors, clicks, conversions)

### First 6 Hours Post-Launch
- [ ] Monitor error logs
- [ ] Track page performance
- [ ] Watch for Stripe webhook failures
- [ ] Monitor email delivery
- [ ] Be ready to hotfix issues

### First 24 Hours
- [ ] Hit goal of 100+ unique visitors
- [ ] Record first 5+ sales
- [ ] Fix any critical bugs
- [ ] Send thank-you emails to early customers
- [ ] Capture user feedback

**Status**: ⏳ PENDING | Estimated time: ongoing | Owner: AJ

---

## 📊 Timeline Summary

| Phase | Owner | Est. Time | Status |
|-------|-------|-----------|--------|
| MVP Core | Rocko | 2h | ✅ DONE |
| Deployment | AJ | 1h | ⏳ TODO |
| Content & Stripe | AJ | 4h | ⏳ TODO |
| Testing | Both | 2h | ⏳ TODO |
| Backend Integration | AJ | 6h | ⏳ TODO |
| Pre-Launch | Both | 2h | ⏳ TODO |
| Launch Day | Both | 1h+ | ⏳ TODO |
| **Total** | - | **~18-20h** | ⏳ IN PROGRESS |

**Time Remaining**: ~28-30 hours (plenty of time for 48-hour deadline!)

---

## 🎯 Success Criteria

### Must Have (Day 1)
- [ ] Website live on Vercel ← AJ to deploy
- [ ] All 10 templates showing with pricing ← AJ to add content
- [ ] Stripe checkout working with test cards ← AJ to add keys
- [ ] Admin dashboard showing orders ← AJ to integrate DynamoDB
- [ ] At least 1 test purchase completed ← Both to QA
- [ ] 100+ unique visitors from organic traffic

### Should Have (Day 1-7)
- [ ] Email delivery on purchase ← AJ to add SendGrid
- [ ] File downloads working ← AJ to add S3
- [ ] Twitter momentum building ← AJ marketing
- [ ] Customer feedback collected ← AJ support
- [ ] First revenue recorded ← AJ to setup Stripe live mode

### Nice to Have (Week 2+)
- [ ] Google Analytics integrated
- [ ] Product Hunt launch
- [ ] Affiliate program
- [ ] 20+ more templates added
- [ ] Creator platform

---

## 🚨 Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Stripe keys not working | Medium | High | Test with real keys before launch |
| Build fails on Vercel | Low | High | Test build locally first |
| Email not sending | Medium | Medium | Use free SendGrid tier, test first |
| No customers first day | Low | Medium | Plan marketing push, share with friends/Twitter |
| Performance issues | Low | High | Monitor Lighthouse, load test before launch |
| Bugs in checkout | Medium | High | Thorough QA testing with different browsers |

---

## 📝 Notes

- **Stripe test mode**: Use prefix `pk_test_` and `sk_test_`
- **Vercel auto-deploy**: Every GitHub push triggers new deployment
- **Environment variables**: Changes require re-deployment
- **Email**: SendGrid free tier is 100 emails/day (enough for launch)
- **Database**: DynamoDB free tier is plenty for MVP
- **Time zone**: All times in PDT (Baha's timezone)

---

## ✍️ Sign-Offs

- [ ] Rocko confirms MVP is complete and ready
- [ ] AJ ready to deploy to Vercel
- [ ] Both agree on launch timeline
- [ ] Stripe keys obtained and ready
- [ ] Marketing plan finalized

---

**Checklist created**: 2026-03-17
**Target launch**: 2026-03-19 (48 hours)
**Status**: 🟢 ON TRACK

---

Print this checklist and check off items as you complete them!
