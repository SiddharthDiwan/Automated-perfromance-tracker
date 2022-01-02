export function getObservationsFromReport(data2) {


    // -------Performance observations -----------------
    var PerformanceObservations = [];
    if (data2["audits"]["dom-size"]["title"] == "Avoid an excessive DOM size") {
        PerformanceObservations.push("Avoid an excessive DOM size, ");
    }

    if (data2["audits"]["server-response-time"]["title"] == "Reduce initial server response time") {
        PerformanceObservations.push("Reduce initial server response time, ");
    }
    if (data2["audits"]["unused-javascript"]["title"] == "Reduce unused JavaScript") {
        PerformanceObservations.push("Reduce unused JavaScript  ");
    }
    if (data2["audits"]["render-blocking-resources"]["title"] == "Eliminate render-blocking resources") {
        PerformanceObservations.push("Eliminate render-blocking resources, ");
    }
    if (data2["audits"]["uses-responsive-images"]["title"] == "Properly size images") {
        PerformanceObservations.push("Properly size images, ");
    }
    if (data2["audits"]["third-party-facades"]["title"] == "Lazy load third-party resources with facades") {
        PerformanceObservations.push("Lazy load third-party resources with facades, ");
    }
    if (data2["audits"]["uses-passive-event-listeners"]["title"] == "Does not use passive listeners to improve scrolling performance") {
        PerformanceObservations.push("Does not use passive listeners to improve scrolling performance, ");
    }
    if (data2["audits"]["no-document-write"]["title"] == "Avoid `document.write()`") {
        PerformanceObservations.push("Avoid `document.write()`, ");
    }
    if (data2["audits"]["unsized-images"]["title"] == "Image elements do not have explicit `width` and `height`") {
        PerformanceObservations.push("Image elements do not have explicit `width` and `height`, ");
    }
    if (data2["audits"]["uses-long-cache-ttl"]["title"] == "Serve static assets with an efficient cache policy") {
        PerformanceObservations.push("Serve static assets with an efficient cache policy, ");
    }
    if (data2["audits"]["total-byte-weight"]["title"] == "Avoid enormous network payloads") {
        PerformanceObservations.push("Avoid enormous network payloads, ");
    }
    // ---------------Accessibility observations -----------------
    var AccessibilityObservations = [];
    if (data2["audits"]["aria-input-field-name"]["title"] == "ARIA input fields do not have accessible names") {
        AccessibilityObservations.push("ARIA input fields do not have accessible names, ");
    }
    if (data2["audits"]["color-contrast"]["title"] == "Background and foreground colors do not have a sufficient contrast ratio.") {
        AccessibilityObservations.push("Background and foreground colors do not have a sufficient contrast ratio., ");
    }
    if (data2["audits"]["heading-order"]["title"] == "Heading elements are not in a sequentially-descending order") {
        AccessibilityObservations.push("Heading elements are not in a sequentially-descending order  ");
    }
    if (data2["audits"]["image-alt"]["title"] == "Image elements do not have `[alt]` attributes")
        AccessibilityObservations.push("Image elements do not have `[alt]` attributes, ");



    // ---------------Best Practices observations -----------------
    var BestPracticesObservations = [];
    if (data2["audits"]["external-anchors-use-rel-noopener"]["title"] == "Links to cross-origin destinations are unsafe")
        BestPracticesObservations.push("Links to cross-origin destinations are unsafe, ");
    if (data2["audits"]["no-vulnerable-libraries"]["title"] == "Includes front-end JavaScript libraries with known security vulnerabilities")
        BestPracticesObservations.push("Includes front-end JavaScript libraries with known security vulnerabilities, ");
    if (data2["audits"]["errors-in-console"]["title"] == "Browser errors were logged to the console")
        BestPracticesObservations.push("Browser errors were logged to the console, ");
    if (data2["audits"]["image-alt"]["title"] == "Image elements do not have `[alt]` attributes")
        BestPracticesObservations.push("Image elements do not have `[alt]` attributes, ");

    // ----------------------Seo observations --------------------
    var SeoObservations = [];
    if (data2["audits"]["is-crawlable"]["title"] == "Page is blocked from indexing")
        SeoObservations.push("Page is blocked from indexing, ");


    // ----------------------Pwa observations --------------------
    var PwaObservations = [];
    if (data2["audits"]["installable-manifest"]["title"] == "Web app manifest or service worker do not meet the installability requirements")
        PwaObservations.push("Web app manifest or service worker do not meet the installability requirements, ");
    if (data2["audits"]["service-worker"]["title"] == "Does not register a service worker that controls page and `start_url`")
        PwaObservations.push("Does not register a service worker that controls page and `start_url`, ");
    if (data2["audits"]["splash-screen"]["title"] == "Is not configured for a custom splash screen")
        PwaObservations.push("Is not configured for a custom splash screen, ");
    if (data2["audits"]["themed-omnibox"]["title"] == "Does not set a theme color for the address bar.")
        PwaObservations.push("Does not set a theme color for the address bar, ");
    if (data2["audits"]["maskable-icon"]["title"] == "Manifest doesn't have a maskable icon")
        PwaObservations.push("Manifest doesn't have a maskable icon, ");
    
    return [
        PerformanceObservations,
        AccessibilityObservations,
        BestPracticesObservations,
        SeoObservations,
        PwaObservations
       ];

}