export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { q } = req.query;

  if (!q || q.length < 2) {
    return res.status(400).json({ error: 'Query must be at least 2 characters' });
  }

  try {
    // Try Clearbit Autocomplete API first
    try {
      const clearbitResponse = await fetch(
        `https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(q)}`,
        {
          headers: {
            'User-Agent': 'Job Alert Platform'
          }
        }
      );

      if (clearbitResponse.ok) {
        const clearbitData = await clearbitResponse.json();
        const companies = clearbitData.slice(0, 8).map(company => ({
          name: company.name,
          domain: company.domain,
          logo: company.logo || `https://logo.clearbit.com/${company.domain}`
        }));

        return res.status(200).json({ companies });
      }
    } catch (clearbitError) {
      console.log('Clearbit API failed, falling back to static list');
    }

    // Fallback to static list if Clearbit fails
    const staticCompanies = [
      { name: 'Google', domain: 'google.com' },
      { name: 'Microsoft', domain: 'microsoft.com' },
      { name: 'Apple', domain: 'apple.com' },
      { name: 'Amazon', domain: 'amazon.com' },
      { name: 'Meta', domain: 'meta.com' },
      { name: 'Netflix', domain: 'netflix.com' },
      { name: 'Tesla', domain: 'tesla.com' },
      { name: 'Spotify', domain: 'spotify.com' },
      { name: 'Uber', domain: 'uber.com' },
      { name: 'Airbnb', domain: 'airbnb.com' },
      { name: 'Stripe', domain: 'stripe.com' },
      { name: 'Salesforce', domain: 'salesforce.com' },
      { name: 'Adobe', domain: 'adobe.com' },
      { name: 'LinkedIn', domain: 'linkedin.com' },
      { name: 'Twitter', domain: 'twitter.com' },
      { name: 'Slack', domain: 'slack.com' },
      { name: 'Zoom', domain: 'zoom.us' },
      { name: 'Dropbox', domain: 'dropbox.com' },
      { name: 'GitHub', domain: 'github.com' },
      { name: 'GitLab', domain: 'gitlab.com' },
      { name: 'Atlassian', domain: 'atlassian.com' },
      { name: 'Shopify', domain: 'shopify.com' },
      { name: 'Square', domain: 'squareup.com' },
      { name: 'PayPal', domain: 'paypal.com' },
      { name: 'Oracle', domain: 'oracle.com' },
      { name: 'IBM', domain: 'ibm.com' },
      { name: 'Intel', domain: 'intel.com' },
      { name: 'NVIDIA', domain: 'nvidia.com' },
      { name: 'AMD', domain: 'amd.com' },
      { name: 'Cisco', domain: 'cisco.com' },
      { name: 'VMware', domain: 'vmware.com' },
      { name: 'Red Hat', domain: 'redhat.com' },
      { name: 'MongoDB', domain: 'mongodb.com' },
      { name: 'Databricks', domain: 'databricks.com' },
      { name: 'Snowflake', domain: 'snowflake.com' },
      { name: 'Palantir', domain: 'palantir.com' },
      { name: 'Coinbase', domain: 'coinbase.com' },
      { name: 'Robinhood', domain: 'robinhood.com' },
      { name: 'Discord', domain: 'discord.com' },
      { name: 'Twitch', domain: 'twitch.tv' },
      { name: 'Reddit', domain: 'reddit.com' },
      { name: 'Pinterest', domain: 'pinterest.com' },
      { name: 'Snapchat', domain: 'snapchat.com' },
      { name: 'TikTok', domain: 'tiktok.com' },
      { name: 'ByteDance', domain: 'bytedance.com' },
      { name: 'Figma', domain: 'figma.com' },
      { name: 'Notion', domain: 'notion.so' },
      { name: 'Canva', domain: 'canva.com' },
      { name: 'Webflow', domain: 'webflow.com' },
      { name: 'HubSpot', domain: 'hubspot.com' },
      { name: 'Zendesk', domain: 'zendesk.com' },
      { name: 'Okta', domain: 'okta.com' },
      { name: 'Twilio', domain: 'twilio.com' },
      { name: 'SendGrid', domain: 'sendgrid.com' },
      { name: 'Mailchimp', domain: 'mailchimp.com' },
      { name: 'Asana', domain: 'asana.com' },
      { name: 'Trello', domain: 'trello.com' },
      { name: 'Monday.com', domain: 'monday.com' },
      { name: 'Airtable', domain: 'airtable.com' },
      { name: 'Zapier', domain: 'zapier.com' },
      { name: 'Intercom', domain: 'intercom.com' },
      { name: 'Segment', domain: 'segment.com' },
      { name: 'Amplitude', domain: 'amplitude.com' },
      { name: 'Mixpanel', domain: 'mixpanel.com' },
      { name: 'Hotjar', domain: 'hotjar.com' },
      { name: 'Optimizely', domain: 'optimizely.com' },
      { name: 'LaunchDarkly', domain: 'launchdarkly.com' },
      { name: 'PagerDuty', domain: 'pagerduty.com' },
      { name: 'New Relic', domain: 'newrelic.com' },
      { name: 'Datadog', domain: 'datadoghq.com' },
      { name: 'Splunk', domain: 'splunk.com' },
      { name: 'Elastic', domain: 'elastic.co' },
      { name: 'HashiCorp', domain: 'hashicorp.com' },
      { name: 'Docker', domain: 'docker.com' },
      { name: 'Kubernetes', domain: 'kubernetes.io' },
      { name: 'CircleCI', domain: 'circleci.com' },
      { name: 'Travis CI', domain: 'travis-ci.org' },
      { name: 'Vercel', domain: 'vercel.com' },
      { name: 'Netlify', domain: 'netlify.com' },
      { name: 'Heroku', domain: 'heroku.com' },
      { name: 'DigitalOcean', domain: 'digitalocean.com' },
      { name: 'Linode', domain: 'linode.com' },
      { name: 'CloudFlare', domain: 'cloudflare.com' },
      { name: 'Auth0', domain: 'auth0.com' },
      { name: 'Firebase', domain: 'firebase.google.com' },
      { name: 'Supabase', domain: 'supabase.com' },
      { name: 'PlanetScale', domain: 'planetscale.com' },
      { name: 'Prisma', domain: 'prisma.io' },
      { name: 'GraphQL', domain: 'graphql.org' },
      { name: 'Apollo', domain: 'apollographql.com' },
      { name: 'Hasura', domain: 'hasura.io' },
      { name: 'Contentful', domain: 'contentful.com' },
      { name: 'Strapi', domain: 'strapi.io' },
      { name: 'Sanity', domain: 'sanity.io' },
      { name: 'Ghost', domain: 'ghost.org' },
      { name: 'WordPress', domain: 'wordpress.com' },
      { name: 'Webflow', domain: 'webflow.com' },
      { name: 'Bubble', domain: 'bubble.io' },
      { name: 'Retool', domain: 'retool.com' },
      { name: 'Storybook', domain: 'storybook.js.org' },
      { name: 'Chromatic', domain: 'chromatic.com' }
    ];

    const searchTerm = q.toLowerCase();
    const filteredCompanies = staticCompanies
      .filter(company =>
        company.name.toLowerCase().includes(searchTerm)
      )
      .slice(0, 8)
      .map(company => ({
        ...company,
        logo: `https://logo.clearbit.com/${company.domain}`
      }));

    res.status(200).json({ companies: filteredCompanies });
  } catch (error) {
    console.error('Company search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}