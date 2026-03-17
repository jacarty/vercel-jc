# jamescarty.co.uk

Personal portfolio site built hosted on Vercel.  
Design inspired by [Paradigm Shift](https://html5up.net/paradigm-shift) by HTML5 UP.

## Deployment

Push to GitHub and connect the repo to [Vercel](https://vercel.com).

### Environment variables (Vercel dashboard)

| Variable | Description |
|---|---|
| `MAILGUN_API_KEY` | Your Mailgun API key |
| `MAILGUN_DOMAIN` | Your Mailgun sending domain |
| `CONTACT_EMAIL` | Email address to receive contact form messages |

The contact form API route uses the **EU Mailgun endpoint** (`api.eu.mailgun.net`). Change to `api.mailgun.net` in `app/api/contact/route.js` if your Mailgun account is US-based.

## Customisation

- **Profile photo**: Replace the placeholder in the hero section (`app/page.js`) with an `<img>` tag pointing to your image in `/public/`.
- **Social links**: Update the GitHub and LinkedIn URLs in `app/page.js`.
- **Projects**: Add or remove project cards in the Projects section.
- **Skills**: Edit the pill tags in the Skills section.
- **Content**: All placeholder text is in `app/page.js` — update to your own copy.

## Structure

```
app/
  layout.js       # Root layout, fonts, metadata
  page.js         # Single-page site (all sections)
  globals.css     # Full stylesheet
  api/
    contact/
      route.js    # Mailgun contact form API
public/           # Static assets (images, favicon)
```
